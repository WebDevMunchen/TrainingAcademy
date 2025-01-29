const ClassActivity = require("../models/classActivity-model.js");
const DeletedClassActivity = require("../models/deletedClassActivity-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const User = require("../models/user-model.js");
const cloudinary = require("../utils/cloudinaryConfig.js");
const Approver = require("../models/approver-model.js");
const nodemailer = require("nodemailer");
const { format } = require("date-fns");
const { DateTime } = require("luxon");
const cron = require("node-cron");
const { createEvent } = require("ics");

const createClassActivity = asyncWrapper(async (req, res, next) => {
  const {
    title,
    description,
    date,
    duration,
    location,
    department,
    capacity,
    month,
    year,
    time,
    teacher,
    safetyBriefing,
  } = req.body;

  let fileUrl = "";
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
      fileUrl = result.secure_url;
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error uploading file",
        error: error.message,
      });
    }
  }

  const activity = await ClassActivity.create({
    title,
    description,
    date,
    duration,
    location,
    department,
    capacity,
    month,
    year,
    time,
    teacher,
    safetyBriefing,
    fileUrl,
  });

  res.status(201).json(activity);
});

const editClassActivity = asyncWrapper(async (req, res, next) => {
  const {
    title,
    description,
    date,
    duration,
    location,
    department,
    capacity,
    month,
    year,
    time,
    teacher,
    safetyBriefing,
  } = req.body;

  const { id } = req.params;

  const existingActivity = await ClassActivity.findById(id).populate({
    path: "registeredUsers",
    match: {
      "classesRegistered.status": {
        $in: ["ausstehend", "genehmigt", "abgelehnt"],
      },
    },
    select: "firstName lastName department classesRegistered",
  });

  if (!existingActivity) {
    return res.status(404).json({
      success: false,
      message: "Aktivität nicht gefunden!",
    });
  }

  let fileUrl = existingActivity.fileUrl;

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
      fileUrl = result.secure_url;
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Fehler beim Hochladen der Datei",
        error: error.message,
      });
    }
  }

  const updatedClass = {
    title,
    description,
    date: new Date(date),
    duration,
    location,
    department,
    capacity,
    month,
    year,
    time,
    teacher,
    safetyBriefing,
    fileUrl,
  };

  try {
    const activity = await ClassActivity.findByIdAndUpdate(id, updatedClass, {
      new: true,
    });

    const approversId = "668e958729a4cd5bb513f562";
    const findApprovers = await Approver.findById(approversId);

    const toAddresses = [
      findApprovers.logistik,
      findApprovers.vertrieb,
      findApprovers.hr,
      findApprovers.it,
      findApprovers.fuhrpark,
      findApprovers.buchhaltung,
      findApprovers.showroom,
      findApprovers.design,
      findApprovers.bestandsmanagement,
      findApprovers.haustechnik,
      findApprovers.unternehmensentwicklung,
      findApprovers.logistikSubstitute,
      findApprovers.vertriebSubstitute,
      findApprovers.hrSubstitute,
      findApprovers.itSubstitute,
      findApprovers.fuhrparkSubstitute,
      findApprovers.buchhaltungSubstitute,
      findApprovers.showroomSubstitute,
      findApprovers.designSubstitute,
      findApprovers.bestandsmanagementSubstitute,
      findApprovers.haustechnikSubstitute,
      findApprovers.unternehmensentwicklungSubstitute,
    ]
      .filter(Boolean)
      .join(", ");

    const formattedDate = format(new Date(existingActivity.date), "dd.MM.yyyy");
    const formattedTime = existingActivity.time;
    const formattedDateUpdated = format(updatedClass.date, "dd.MM.yyyy");
    const formattedTimeUpdated = updatedClass.time;

    const fieldsChanged =
      JSON.stringify(existingActivity.date) !==
        JSON.stringify(updatedClass.date) ||
      existingActivity.time.trim() !== updatedClass.time.trim() ||
      existingActivity.location.trim() !== updatedClass.location.trim() ||
      existingActivity.teacher.trim() !== updatedClass.teacher.trim();

    const userNames = existingActivity.registeredUsers
      .filter((user) =>
        user.classesRegistered.some((registration) =>
          registration.registeredClassID.equals(id)
        )
      )
      .map((user) => {
        const registration = user.classesRegistered.find((registration) =>
          registration.registeredClassID.equals(id)
        );
        const status = registration ? registration.status : "N/A";
        return `${user.firstName} ${user.lastName} (${user.department}) | Genehmigungsstatus: ${status}`;
      });

    if (fieldsChanged) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER,
          pass: process.env.APP_PASSWORD,
        },
      });

      let mailHtml = "";

      if (userNames.length === 0) {
        mailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Hallo zusammen,</p>
          <p>Es gab Änderungen bei der Schulung: <em>"${
            updatedClass.title
          }"</em></p>
          <p><strong>Hier sind die Details der Änderungen:</strong></p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;"></th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;">Alte Informationen</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;">Neue Informationen</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Datum</td>
                <td style="border: 1px solid #ddd; padding: 8px; ${
                  formattedDate !== formattedDateUpdated
                    ? "text-decoration: line-through;"
                    : ""
                }">${formattedDate}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${formattedDateUpdated}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Uhrzeit</td>
                <td style="border: 1px solid #ddd; padding: 8px; ${
                  formattedTime !== formattedTimeUpdated
                    ? "text-decoration: line-through;"
                    : ""
                }">${formattedTime}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${formattedTimeUpdated}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Ort</td>
                <td style="border: 1px solid #ddd; padding: 8px; ${
                  existingActivity.location !== updatedClass.location
                    ? "text-decoration: line-through;"
                    : ""
                }">${existingActivity.location}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  updatedClass.location
                }</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Referent*in</td>
                <td style="border: 1px solid #ddd; padding: 8px; ${
                  existingActivity.teacher !== updatedClass.teacher
                    ? "text-decoration: line-through;"
                    : ""
                }">${existingActivity.teacher}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  updatedClass.teacher
                }</td>
              </tr>
            </tbody>
          </table>
          <p>Bisher hat sich niemand für die Schulung angemeldet, daher müsst ihr keine weiteren Maßnahmen ergreifen.</p><br />
          <p>Bei Fragen gerne melden.</p>
          <p>Euere Trainingsabteilung</p>
        </div>
      `;
      } else {
        mailHtml = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Hallo zusammen,</p>
        <p>Es gab Änderungen bei der Schulung: <em>"${
          updatedClass.title
        }"</em></p>
        <p><strong>Hier sind die Details der Änderungen:</strong></p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;"></th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;">Alte Informationen</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;">Neue Informationen</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Datum</td>
              <td style="border: 1px solid #ddd; padding: 8px; ${
                formattedDate !== formattedDateUpdated
                  ? "text-decoration: line-through;"
                  : ""
              }">${formattedDate}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${formattedDateUpdated}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Uhrzeit</td>
              <td style="border: 1px solid #ddd; padding: 8px; ${
                formattedTime !== formattedTimeUpdated
                  ? "text-decoration: line-through;"
                  : ""
              }">${formattedTime}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${formattedTimeUpdated}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Ort</td>
              <td style="border: 1px solid #ddd; padding: 8px; ${
                existingActivity.location !== updatedClass.location
                  ? "text-decoration: line-through;"
                  : ""
              }">${existingActivity.location}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                updatedClass.location
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Referent*in</td>
              <td style="border: 1px solid #ddd; padding: 8px; ${
                existingActivity.teacher !== updatedClass.teacher
                  ? "text-decoration: line-through;"
                  : ""
              }">${existingActivity.teacher}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                updatedClass.teacher
              }</td>
            </tr>
          </tbody>
        </table>
        <p>Folgende Mitarbeiter haben sich für diese Schulung angemeldet:</p>
        <ul>
          ${userNames.map((userName) => `<li>${userName}</li>`).join("")}
        </ul>
        <p>Bitte informiert die Mitarbeiter eurer Abteilung und passt deren Anfrage ggf. an.</p>
        <p>Bei Fragen gerne melden.</p>
        <p>Euere Trainingsabteilung</p>

                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 10px 0; border-collapse: collapse;">
        <tr>
          <td align="center">
            <!-- VML-based button rendering for Outlook -->
            <!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.click-n-train.de/classInformation/${id}" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" strokecolor="#007bff" fillcolor="#007bff">
              <w:anchorlock/>
              <center style="color:#ffffff;font-family:sans-serif;font-size:16px;">Anfrage bearbeiten</center>
            </v:roundrect>
            <![endif]-->
  
            <!-- Fallback for non-Outlook clients -->
            <a href="www.click-n-train.de/classInformation/${id}" style="
                background-color: #007bff;
                border-radius: 5px;
                color: #ffffff;
                display: inline-block;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 50px;
                text-align: center;
                text-decoration: none;
                width: 200px;
                height: 50px;
                mso-hide: all;
              "
              target="_blank"
              >Zum Genehmigungstool</a>
          </td>
        </tr>
      </table>

      </div>`;
      }

      const mailOptions = {
        from: {
          name: "Schulung geändert - Click & Train - No reply",
          address: process.env.USER,
        },
        to: toAddresses,
        subject: "Click & Train - Rent.Group München - Schulung geändert",
        text: "Click & Train - Rent.Group München - Schulung geändert",
        html: mailHtml,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email!");
        } else {
          console.log("Email sent!");
        }
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Aktivität erfolgreich aktualisiert" +
        (fieldsChanged ? " und Benachrichtigung gesendet" : ""),
      data: activity,
    });
  } catch (error) {
    next(error);
  }
});

const updateCancelationReason = asyncWrapper(async (req, res, next) => {
  const { stornoReason } = req.body;
  const { id } = req.params;

  if (!Array.isArray(stornoReason)) {
    return res.status(400).json({ message: "stornoReason must be an array" });
  }

  const activity = await ClassActivity.findById(id);

  if (!activity) {
    throw new ErrorResponse(404, "Activity not found!");
  }

  activity.stornoReason = [...activity.stornoReason, ...stornoReason];

  await activity.save();

  res.status(201).json(activity);
});

const registerClass = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userID } = req.user;

  const classActivity = await ClassActivity.findById(id);
  if (classActivity.registeredUsers.includes(userID)) {
    throw new ErrorResponse(400, "User is already registered for this class");
  }

  const registeredClass = await ClassActivity.findByIdAndUpdate(
    id,
    { $push: { registeredUsers: userID } },
    { new: true, populate: "registeredUsers" }
  );

  req.registeredClass = registeredClass;

  next();
});

const cancelUserRegistration = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userID } = req.user;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return next(new ErrorResponse(404, "User not found"));
    }

    const registeredClass = user.classesRegistered.find(
      (classItem) => classItem.registeredClassID.toString() === id
    );

    if (!registeredClass) {
      return res
        .status(400)
        .json({ message: "User is not registered for this class." });
    }

    user.classesRegistered = user.classesRegistered.filter(
      (classItem) => classItem.registeredClassID.toString() !== id
    );
    await user.save();

    const classActivity = await ClassActivity.findById(id).populate(
      "registeredUsers"
    );

    if (!classActivity) {
      return res.status(404).json({ message: "ClassActivity not found." });
    }

    if (registeredClass.status === "genehmigt") {
      classActivity.usedCapacity = classActivity.usedCapacity - 1;
    }

    classActivity.registeredUsers = classActivity.registeredUsers.filter(
      (registeredUser) => registeredUser._id.toString() !== userID
    );

    await classActivity.save();

    const updatedClassActivity = await ClassActivity.findById(id).populate(
      "registeredUsers"
    );

    res.json({ message: "Success", updatedCapacity: updatedClassActivity });
  } catch (error) {
    console.error("Error in cancelUserRegistration!");
    next(error);
  }
});

const increaseClassCapacity = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const classActivity = await ClassActivity.findById(id);

  if (classActivity.usedCapacity >= classActivity.capacity) {
    throw new ErrorResponse(404, "Capacity reached!");
  }

  classActivity.usedCapacity += 1;

  const updatedCapacity = await classActivity.save();

  res.status(201).json(updatedCapacity);
});

const decreaseClassCapacity = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const updatedCapacity = await ClassActivity.findByIdAndUpdate(
    id,

    { $inc: { usedCapacity: -1 } },
    { new: true, populate: "registeredUsers" }
  );

  await updatedCapacity.save();

  res.status(201).json(updatedCapacity);
});

const getActivity = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const activity = await ClassActivity.findById(id).populate("registeredUsers");

  if (!activity) {
    throw new ErrorResponse(404, "notfound");
  }

  res.status(201).json(activity);
});

const getAllActivities = asyncWrapper(async (req, res, next) => {
  try {
    const { month, year } = req.query;
    let query = {};

    if (month) {
      query.month = month;
    }

    if (year) {
      query.year = year;
    }

    const allActivities = await ClassActivity.find(query)
      .populate("registeredUsers")
      .sort({ date: -1, time: -1 });

    res.json(allActivities);
  } catch (error) {
    console.error("Error fetching activities!");
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteClass = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const approversId = "668e958729a4cd5bb513f562";

  const notifyBeforeDelete = await ClassActivity.findById(id).populate({
    path: "registeredUsers",
    select: "firstName lastName department classesRegistered",
  });

  if (!notifyBeforeDelete) {
    return res.status(404).json({ message: "Class not found" });
  }

  const deletedClassData = {
    title: notifyBeforeDelete.title,
    description: notifyBeforeDelete.description,
    month: notifyBeforeDelete.month,
    year: notifyBeforeDelete.year,
    date: notifyBeforeDelete.date,
    duration: notifyBeforeDelete.duration,
    time: notifyBeforeDelete.time,
    location: notifyBeforeDelete.location,
    department: notifyBeforeDelete.department,
    capacity: notifyBeforeDelete.capacity,
    usedCapacity: notifyBeforeDelete.usedCapacity,
    registeredUsers: notifyBeforeDelete.registeredUsers,
    teacher: notifyBeforeDelete.teacher,
    safetyBriefing: notifyBeforeDelete.safetyBriefing,
    stornoReason: [],
    fileUrl: notifyBeforeDelete.fileUrl,
    storno: true,
  };

  const duplicatedClass = new DeletedClassActivity(deletedClassData);
  await duplicatedClass.save();

  const allUsers = await User.find({})
    .populate("classesRegistered.registeredClassID")
    .populate("userContactInformation")
    .populate("message.messageID");

  const userNames = allUsers.reduce((acc, user) => {
    const hasMatchingClass = user.classesRegistered.some(
      (singleClass) =>
        singleClass.registeredClassID &&
        singleClass.registeredClassID._id.toString() === id &&
        (singleClass.status === "ausstehend" ||
          singleClass.status === "genehmigt")
    );

    if (hasMatchingClass) {
      acc.push(`${user.firstName} ${user.lastName} (${user.department})`);
    }

    return acc;
  }, []);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  const findApprovers = await Approver.findById(approversId);

  const toAddresses = [
    findApprovers.logistik,
    findApprovers.vertrieb,
    findApprovers.hr,
    findApprovers.it,
    findApprovers.fuhrpark,
    findApprovers.buchhaltung,
    findApprovers.showroom,
    findApprovers.design,
    findApprovers.bestandsmanagement,
    findApprovers.haustechnik,
    findApprovers.unternehmensentwicklung,
    findApprovers.logistikSubstitute,
    findApprovers.vertriebSubstitute,
    findApprovers.hrSubstitute,
    findApprovers.itSubstitute,
    findApprovers.fuhrparkSubstitute,
    findApprovers.buchhaltungSubstitute,
    findApprovers.showroomSubstitute,
    findApprovers.designSubstitute,
    findApprovers.bestandsmanagementSubstitute,
    findApprovers.haustechnikSubstitute,
    findApprovers.unternehmensentwicklungSubstitute,
  ]
    .filter(Boolean)
    .join(", ");

  let mailHtml;

  if (userNames.length > 0) {
    mailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Hallo zusammen,</p>
        <p>Die Schulung <em>"${
          notifyBeforeDelete.title
        }"</em> wurde abgesagt.</p>
        <p>Die Anfrage dieser Mitarbeiter wurde bereits genehmigt oder steht noch aus:</p>
        <ul>
          ${userNames.map((name) => `<li>${name}</li>`).join("")}
        </ul>
        <p>Bitte die Kollegen aus eurer Abteilung informieren, falls sie betroffen sind.</p>
        <p>Bei Fragen gerne melden.</p>
        <p>Euere Trainingsabteilung</p>
      </div>
    `;
  } else {
    mailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Hallo zusammen,</p>
        <p>Die Schulung <em>"${notifyBeforeDelete.title}"</em> wurde abgesagt.</p>
        <p>Bisher hat sich niemand für die Schulung angemeldet, daher müsst ihr keine weiteren Maßnahmen ergreifen.</p>
        <p>Bei Fragen gerne melden.</p>
        <p>Euere Trainingsabteilung</p>
      </div>
    `;
  }

  const mailOptions = {
    from: {
      name: "Schulung abgesagt - Click & Train - No reply",
      address: process.env.USER,
    },
    to: toAddresses,
    subject: "Click & Train - Rent.Group München - Schulung abgesagt",
    text: "Click & Train - Rent.Group München - Schulung abgesagt",
    html: mailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email!");
  }

  await ClassActivity.findByIdAndDelete(id);
  await User.updateMany(
    { "classesRegistered.registeredClassID": id },
    { $pull: { classesRegistered: { registeredClassID: id } } }
  );

  res.status(200).json({
    message: "Class and related user registrations deleted successfully",
  });
});

const checkAndUpdateClassRegistrations = async () => {
  const now = DateTime.now().setZone("Europe/Berlin");
  const in24Hours = now.plus({ hours: 24 });

  try {
    const classes = await ClassActivity.find();

    const classesToProcess = classes.filter((classActivity) => {
      const classDateTime = DateTime.fromISO(classActivity.date.toISOString())
        .setZone("Europe/Berlin")
        .set({
          hour: parseInt(classActivity.time.split(":")[0]),
          minute: parseInt(classActivity.time.split(":")[1]),
        });

      return classDateTime >= now && classDateTime <= in24Hours;
    });

    for (const classActivity of classesToProcess) {
      const registeredUserIds = classActivity.registeredUsers;

      await User.updateMany(
        {
          _id: { $in: registeredUserIds },
          classesRegistered: {
            $elemMatch: {
              registeredClassID: classActivity._id,
              status: "ausstehend",
            },
          },
        },
        {
          $set: {
            "classesRegistered.$.status": "abgelehnt",
            "classesRegistered.$.reason":
              "Automatisch abgelehnt(keine Antwort vom Genehmiger oder seinem Vertreter)",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error checking and updating class registrations!");
  }
};

cron.schedule(
  "30 17 * * *",
  () => {
    checkAndUpdateClassRegistrations();
  },
  {
    scheduled: true,
    timezone: "Europe/Berlin",
  }
);

const enlist = asyncWrapper(async (req, res, next) => {
  const { userId } = req.body;
  const { id: classId } = req.params;

  if (!userId || !classId) {
    return res
      .status(400)
      .json({ message: "User ID and Class ID are required." });
  }

  const classActivity = await ClassActivity.findById(classId);
  const user = await User.findById(userId);

  if (!classActivity) {
    return res.status(404).json({ message: "Class activity not found." });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (!classActivity.registeredUsers.includes(userId)) {
    classActivity.registeredUsers.push(userId);

    if (classActivity.capacity - classActivity.usedCapacity === 0) {
      classActivity.capacity += 1;
    }
    classActivity.usedCapacity += 1;
  } else {
    return res.status(409).json({ message: "User already registered!" });
  }

  const classEntry = user.classesRegistered.find(
    (entry) => entry.registeredClassID.toString() === classId
  );

  if (!classEntry) {
    user.classesRegistered.push({
      registeredClassID: classId,
      status: "genehmigt",
      statusAttended: "teilgenommen",
    });
  }

  await classActivity.save();
  await user.save();

  res.status(201).json(classActivity);
});

const exportCalendar = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const classActivity = await ClassActivity.findById(id);

  if (!classActivity) {
    return res.status(404).json({ message: "Class activity not found." });
  }

  const eventDate = new Date(classActivity.date);
  const [hours, minutes] = classActivity.time.split(":").map(Number);

  const event = {
    start: [
      eventDate.getFullYear(),
      eventDate.getMonth() + 1,
      eventDate.getDate(),
      hours,
      minutes,
    ],
    duration: { minutes: classActivity.duration },
    title: classActivity.title,
    description: classActivity.description || "",
    location: classActivity.location || "",
    organizer: { name: "Referent*in: " + classActivity.teacher || "Organizer" },
    timezone: "Europe/Berlin", // Use a proper IANA timezone
  };

  createEvent(event, (error, value) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error generating calendar event." });
    }

    res.setHeader("Content-Type", "text/calendar");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${classActivity.title}.ics"`
    );
    res.send(value);
  });
});

const sendReminder = asyncWrapper(async (req, res, next) => {
  const { id: classId } = req.params;

  if (!classId) {
    return res.status(400).json({ message: "Class ID is required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  const users = await User.find({
    "classesRegistered.registeredClassID": classId,
    "classesRegistered.reminded": false,
  })
    .populate("userContactInformation")
    .populate({
      path: "classesRegistered.registeredClassID",
      select: "title date time",
    });

  if (!users.length) {
    return res
      .status(404)
      .json({ message: "No users to remind for this class." });
  }

  for (const user of users) {
    for (const registration of user.classesRegistered) {
      if (
        registration.registeredClassID &&
        registration.registeredClassID._id.toString() === classId &&
        !registration.reminded
      ) {
        const approver = await Approver.findById(user.userContactInformation);

        if (!approver) {
          console.error(`Approver not found for user: ${user._id}`);
          continue;
        }

        const department = user.department.toLowerCase();
        const approverEmail = approver[department];
        const substituteEmail = approver[`${department}Substitute`];

        if (!approverEmail || !substituteEmail) {
          console.error(
            `Approver or substitute email not found for department: ${department}`
          );
          continue;
        }

        const classDetails = registration.registeredClassID;
        const { title, date, time } = classDetails || {};

        const mailOptions = {
          from: {
            name: "Mitarbeiter wartet auf Genehmigung - Click & Train - No reply",
            address: process.env.USER,
          },
          to: `${approverEmail}, ${substituteEmail}`, 
          subject: `Reminder for User: ${user.firstName} ${user.lastName}`,
          html: `Hallo zusammen,<br><br>
          ${user.firstName} ${
            user.lastName
          } wartet immer noch auf eure Genehmigung für die folgende Schulung:<br><br>
          
          <strong>${title || "N/A"}</strong><br><br>
          - Datum: ${date ? new Date(date).toLocaleDateString() : "N/A"}<br>
          - Uhrzeit: ${time || "N/A"}<br><br>
          
          Bitte beantwortet die Anfrage schnellstmöglich.<br><br>
          
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 10px 0; border-collapse: collapse;">
            <tr>
              <td align="center">
                <!-- VML-based button rendering for Outlook -->
                <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.click-n-train.de/classInformation/${classId}" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" strokecolor="#007bff" fillcolor="#007bff">
                  <w:anchorlock/>
                  <center style="color:#ffffff;font-family:sans-serif;font-size:16px;">Anfrage beantworten</center>
                </v:roundrect>
                <![endif]-->
        
                <!-- Fallback for non-Outlook clients -->
                <a href="www.click-n-train.de/classInformation/${classId}" style="
                    background-color: #007bff;
                    border-radius: 5px;
                    color: #ffffff;
                    display: inline-block;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 50px;
                    text-align: center;
                    text-decoration: none;
                    width: 200px;
                    height: 50px;
                    mso-hide: all;
                    " target="_blank">
                    Zum Genehmigungstool
                </a>
              </td>
            </tr>
          </table>
          
          <br>
          Bei Fragen könnt ihr euch gerne melden.
          Eure Trainingabteilung`,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(
            `Reminder sent to ${approverEmail} and ${substituteEmail}.`
          );

          registration.reminded = true;
          await user.save();
        } catch (error) {
          console.error(`Failed to send reminder for user: ${user._id}`, error);
        }
      }
    }
  }

  res.status(200).json({ message: "Reminders sent successfully." });
});

cron.schedule(
  "00 03 * * *",
  async () => {
    console.log("Running Cron Job: Resetting 'reminded' status for all users");

    try {
      const users = await User.find();

      for (const user of users) {
        for (const registration of user.classesRegistered) {
          registration.reminded = false; 
        }

        await user.save();
        console.log(`Updated reminded status for user: ${user._id}`);
      }

      console.log("Successfully reset 'reminded' status for all users.");
    } catch (error) {
    }
  },
  {
    timezone: "Europe/Berlin", 
  }
);

module.exports = {
  createClassActivity,
  getAllActivities,
  registerClass,
  getActivity,
  increaseClassCapacity,
  decreaseClassCapacity,
  editClassActivity,
  cancelUserRegistration,
  updateCancelationReason,
  deleteClass,
  checkAndUpdateClassRegistrations,
  enlist,
  exportCalendar,
  sendReminder,
};

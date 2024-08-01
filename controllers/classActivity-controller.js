const ClassActivity = require("../models/classActivity-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const User = require("../models/user-model.js");
const cloudinary = require("../utils/cloudinaryConfig.js");
const Approver = require("../models/approver-model.js");
const nodemailer = require("nodemailer");

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

// const editClassActivity = asyncWrapper(async (req, res, next) => {
//   const {
//     title,
//     description,
//     date,
//     duration,
//     location,
//     department,
//     capacity,
//     month,
//     year,
//     time,
//     teacher,
//     safetyBriefing,
//   } = req.body;

//   const { id } = req.params;

//   let fileUrl = "";
//   if (req.file) {
//     try {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         resource_type: "auto",
//       });
//       fileUrl = result.secure_url;
//       console.log("File URL:", fileUrl);
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Error uploading file",
//         error: error.message,
//       });
//     }
//   }

//   const updatedClass = {
//     title,
//     description,
//     date,
//     duration,
//     location,
//     department,
//     capacity,
//     month,
//     year,
//     time,
//     teacher,
//     safetyBriefing,
//     fileUrl,
//   };

//   const activity = await ClassActivity.findByIdAndUpdate(id, updatedClass, {
//     new: true,
//   });

//   if (!activity) {
//     throw new ErrorResponse(404, "Activity not found!");
//   } else {
//     res.status(201).json(activity);
//   }
// });

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

  // Fetch existing class activity data
  const existingActivity = await ClassActivity.findById(id);
  if (!existingActivity) {
    return res.status(404).json({
      success: false,
      message: "Aktivität nicht gefunden!",
    });
  }

  let fileUrl = "";
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
      fileUrl = result.secure_url;
      console.log("File URL:", fileUrl);
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
  };

  try {
    // Update the class activity
    const activity = await ClassActivity.findByIdAndUpdate(id, updatedClass, {
      new: true,
    });

    // Prepare email data
    const approversId = "668e958729a4cd5bb513f562";
    const findApprovers = await Approver.findById(approversId);

    const toAddresses = [
      findApprovers.logistik,
      findApprovers.vertrieb,
      findApprovers.hr,
      findApprovers.it,
      findApprovers.fuhrpark,
      findApprovers.buchhaltung,
      findApprovers.einkauf,
      findApprovers.design,
      findApprovers.projektmanagement,
      findApprovers.officemanagement,
      findApprovers.logistikSubstitute,
      findApprovers.vertriebSubstitute,
      findApprovers.hrSubstitute,
      findApprovers.itSubstitute,
      findApprovers.fuhrparkSubstitute,
      findApprovers.buchhaltungSubstitute,
      findApprovers.einkaufSubstitute,
      findApprovers.designSubstitute,
      findApprovers.projektmanagementSubstitute,
      findApprovers.officemanagementSubstitute,
    ].join(", ");

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

    const mailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <p>Hallo zusammen,</p>
      <p>Es gab Änderungen bei der Schulung: <em>"${updatedClass.title}"</em></p>
      <p><strong>Hier sind die Details der Änderungen:</strong></p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;"></th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;">Alte Daten</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;">Neue Daten</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Datum</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${existingActivity.date}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${updatedClass.date}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Dauer</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${existingActivity.duration} Minuten</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${updatedClass.duration} Minuten</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Ort</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${existingActivity.location}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${updatedClass.location}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Uhrzeit</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${existingActivity.time}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${updatedClass.time}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Referent*in</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${existingActivity.teacher}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${updatedClass.teacher}</td>
          </tr>
        </tbody>
      </table>
      <p>Bitte die Kollegen aus eurer Abteilung informieren, falls sie betroffen sind, und passt gegebenenfalls deren Genehmigungsstatus an.</p>
      <p>Bei Fragen gerne melden.</p>
      <p>Euer Training Abteilung</p>
    </div>
  `;

    const mailOptions = {
      from: {
        name: "Schulung Aktualisiert - No reply",
        address: process.env.USER,
      },
      to: toAddresses,
      subject: "Training Academy - Rent Group München - Schulung Aktualisiert",
      text: "Training Academy - Rent Group München - Schulung Aktualisiert",
      html: mailHtml,
    };

    const sendMail = async (transporter, mailOptions) => {
      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error("Fehler beim Versenden der E-Mail:", error);
      }
    };

    await sendMail(transporter, mailOptions);

    res.status(200).json({
      success: true,
      message:
        "Aktivität erfolgreich aktualisiert und Benachrichtigung gesendet",
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
    console.error("Error in cancelUserRegistration:", error);
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
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteClass = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const approversId = "668e958729a4cd5bb513f562";

  const findApprovers = await Approver.findById(approversId);
  const notifyBeforeDelete = await ClassActivity.findById(id);

  const usersRegistered = await User.find({
    "classesRegistered.registeredClassID": id,
  });

  const userNames = usersRegistered.map(
    (user) => `${user.firstName} ${user.lastName}`
  );

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

  const toAddresses = [
    findApprovers.logistik,
    findApprovers.vertrieb,
    findApprovers.hr,
    findApprovers.it,
    findApprovers.fuhrpark,
    findApprovers.buchhaltung,
    findApprovers.einkauf,
    findApprovers.design,
    findApprovers.projektmanagement,
    findApprovers.officemanagement,
    findApprovers.logistikSubstitute,
    findApprovers.vertriebSubstitute,
    findApprovers.hrSubstitute,
    findApprovers.itSubstitute,
    findApprovers.fuhrparkSubstitute,
    findApprovers.buchhaltungSubstitute,
    findApprovers.einkaufSubstitute,
    findApprovers.designSubstitute,
    findApprovers.projektmanagementSubstitute,
    findApprovers.officemanagementSubstitute,
  ].join(", ");

  let mailHtml;

  if (userNames.length > 0) {
    mailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Hallo zusammen,</p>
        <p>Die Schulung <em>"${
          notifyBeforeDelete.title
        }"</em> wurde abgesagt.</p>
        <p>Folgende Mitarbeiter haben sich für diese Schulung angemeldet:</p>
        <ul>
          ${userNames.map((name) => `<li>${name}</li>`).join("")}
        </ul>
         <p>Bitte die Kollegen aus eurer Abteilung informieren, wenn sie betroffen sind.</p>
        <p>Bei Fragen gerne melden.</p>
        <p>Euer Training Abteilung</p>

      </div>
    `;
  } else {
    mailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Hallo zusammen,</p>
        <p>Die Schulung <em>"${notifyBeforeDelete.title}"</em> wurde abgesagt.</p>
        <p>Bisher hat sich niemand für die Schulung angemeldet, daher müsst ihr keine weiteren Maßnahmen ergreifen.</p>
        <p>Bei Fragen gerne melden.</p>
        <p>Euer Training Abteilung</p>

      </div>
    `;
  }

  const mailOptions = {
    from: {
      name: "Schulung Abgesagt - No reply",
      address: process.env.USER,
    },
    to: toAddresses,
    subject: "Training Academy - Rent Group München",
    text: "Training Academy - Rent Group München",
    html: mailHtml,
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  await sendMail(transporter, mailOptions);

  const deletedClass = await ClassActivity.findByIdAndDelete(id);
  if (!deletedClass) {
    return res.status(404).json({ message: "Class not found" });
  }

  await User.updateMany(
    { "classesRegistered.registeredClassID": id },
    { $pull: { classesRegistered: { registeredClassID: id } } }
  );

  res.status(200).json({
    message: "Class and related user registrations deleted successfully",
  });
});

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
};

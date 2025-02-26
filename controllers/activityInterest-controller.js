const ErrorResponse = require("../utils/errorResponse.js");
const ActivityInterest = require("../models/activityInterest-model.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const User = require("../models/user-model.js");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");

const createInterest = asyncWrapper(async (req, res, next) => {
  const { title, description, tag, targetGroup, tookPlace } = req.body;

  const parsedTags = typeof tag === "string" ? JSON.parse(tag) : tag || [];
  const parsedTargetGroups =
    typeof targetGroup === "string"
      ? JSON.parse(targetGroup)
      : targetGroup || [];

  let previewPicture = null;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "activity_interests",
      });
      previewPicture = result.secure_url;
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error uploading image to Cloudinary", error });
    }
  }

  const interest = await ActivityInterest.create({
    title,
    description,
    previewPicture,
    tag: parsedTags,
    targetGroup: parsedTargetGroups,
    tookPlace,
  });

  res.status(201).json(interest);
});

const editInterest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  let { title, description, tag, tookPlace, targetGroup } = req.body;

  const parsedTags = typeof tag === "string" ? JSON.parse(tag) : tag || [];
  const parsedTargetGroup =
    typeof targetGroup === "string"
      ? JSON.parse(targetGroup)
      : targetGroup || [];

  const existingInterest = await ActivityInterest.findById(id);
  if (!existingInterest) {
    throw new ErrorResponse(404, "Interest not found!");
  }

  let previewPicture = existingInterest.previewPicture;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "activity_interests",
      });
      previewPicture = result.secure_url;
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error uploading image to Cloudinary", error });
    }
  }

  const updatedInterest = await ActivityInterest.findByIdAndUpdate(
    id,
    {
      title,
      description,
      previewPicture,
      tag: parsedTags,
      targetGroup: parsedTargetGroup,
      tookPlace,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedInterest);
});

const deleteInterest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const interest = await ActivityInterest.findByIdAndDelete(id);

  if (!interest) {
    throw new ErrorResponse(404, "Interest not found!");
  }

  res.status(200).json({ message: "success" });
});

const getInterest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const interest = await ActivityInterest.findById(id)
    .populate({ path: "interestedUsers.user" })
    .populate({ path: "pastInterests.users.user" });

  if (!interest) {
    throw new ErrorResponse(404, "Interest not found!");
  }

  res.status(200).json(interest);
});

const getEveryInterest = asyncWrapper(async (req, res, next) => {
  const interest = await ActivityInterest.find({});

  res.status(200).json(interest);
});

const showInterest = asyncWrapper(async (req, res, next) => {
  const { id: classId } = req.params;
  const { id: userId } = req.user;

  try {
    const activityInterest = await ActivityInterest.findById(classId);

    if (!activityInterest) {
      return res.status(404).json({ message: "Activity interest not found" });
    }

    const alreadyInterested = activityInterest.interestedUsers.some(
      (entry) => entry.user.toString() === userId
    );

    if (alreadyInterested) {
      return res
        .status(400)
        .json({ message: "User has already shown interest" });
    }

    activityInterest.interestedUsers.push({
      user: userId,
      interestedAt: new Date(),
    });

    await activityInterest.save();

    const userInfo = await User.findById(userId);

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

    const registeredUsers = activityInterest.interestedUsers.length;

    const mailOptions = {
      from: {
        name: "Neues Interesse - Click & Train - No reply",
        address: process.env.USER,
      },
      to: `${userInfo.inbox}`,
      subject: "Click & Train - Rent.Group München - Neues Interesse",
      text: `Neues Interesse für ${activityInterest.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px;">
          <h2 style="color: #007bff;">Neues Interesse für ${
            activityInterest.title
          }</h2>
          <p><strong>${userInfo.firstName} ${
        userInfo.lastName
      }</strong> hat sein Interesse an der Teilnahme an der Schulung <strong>${
        activityInterest.title
      }</strong> bekundet.</p>
          <p>Derzeit gibt es insgesamt <strong>${registeredUsers}</strong> 
  ${registeredUsers === 1 ? "Interesse" : "Interessen"} für diese Schulung.</p>
          <hr style="border: 1px solid #ddd;">

                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 10px 0; border-collapse: collapse;">
        <tr>
          <td align="center">
            <!-- VML-based button rendering for Outlook -->
            <!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.click-n-train.de/admin/classInterest" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" strokecolor="#007bff" fillcolor="#007bff">
              <w:anchorlock/>
              <center style="color:#ffffff;font-family:sans-serif;font-size:16px;">Anfrage bearbeiten</center>
            </v:roundrect>
            <![endif]-->
  
            <!-- Fallback for non-Outlook clients -->
            <a href="www.click-n-train.de/admin/classInterest" style="
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
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email!");
    }

    res.status(200).json(activityInterest);
  } catch (error) {
    res.status(500).json({ message: "Error adding interest" });
  }
});

const markTookPlace = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const interest = await ActivityInterest.findById(id).populate(
    "interestedUsers.user"
  );

  if (!interest) {
    return res.status(404).json({ message: "Activity not found" });
  }

  if (interest.interestedUsers.length > 0) {
    interest.pastInterests.push({
      date: new Date(),
      users: interest.interestedUsers
        .filter((u) => u.user)
        .map((u) => ({
          user: u.user,
          interestedAt: u.interestedAt,
        })),
    });
  }

  interest.lastTookPlace = new Date();
  interest.interestedUsers = [];

  await interest.save();

  res.status(200).json(interest);
});

module.exports = {
  createInterest,
  editInterest,
  getEveryInterest,
  deleteInterest,
  getInterest,
  showInterest,
  markTookPlace,
};

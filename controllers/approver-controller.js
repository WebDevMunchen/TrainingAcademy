const Approver = require("../models/approver-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");

const createApprover = asyncWrapper(async (req, res, next) => {
  const {
    logistik,
    vertrieb,
    hr,
    it,
    fuhrpark,
    buchhaltung,
    showroom,
    design,
    bestandsmanagement,
    haustechnik,
    unternehmensentwicklung,
    logistikSubstitute,
    vertriebSubstitute,
    hrSubstitute,
    itSubstitute,
    fuhrparkSubstitute,
    buchhaltungSubstitute,
    showroomSubstitute,
    designSubstitute,
    bestandsmanagementSubstitute,
    haustechnikSubstitute,
    unternehmensentwicklungSubstitute
  } = req.body;

  const approver = await Approver.create({
    logistik,
    vertrieb,
    hr,
    it,
    fuhrpark,
    buchhaltung,
    showroom,
    design,
    bestandsmanagement,
    haustechnik,
    unternehmensentwicklung,
    logistikSubstitute,
    vertriebSubstitute,
    hrSubstitute,
    itSubstitute,
    fuhrparkSubstitute,
    buchhaltungSubstitute,
    showroomSubstitute,
    designSubstitute,
    bestandsmanagementSubstitute,
    haustechnikSubstitute,
    unternehmensentwicklungSubstitute
  });

  res.status(201).json(approver);
});

const editApprover = asyncWrapper(async (req, res, next) => {
  const {
    logistik,
    vertrieb,
    hr,
    it,
    fuhrpark,
    buchhaltung,
    showroom,
    design,
    bestandsmanagement,
    haustechnik,
    unternehmensentwicklung,
    logistikSubstitute,
    vertriebSubstitute,
    hrSubstitute,
    itSubstitute,
    fuhrparkSubstitute,
    buchhaltungSubstitute,
    showroomSubstitute,
    designSubstitute,
    bestandsmanagementSubstitute,
    haustechnikSubstitute,
    unternehmensentwicklungSubstitute
  } = req.body;

  const { id } = req.params;

  const updateApprover = {
    logistik,
    vertrieb,
    hr,
    it,
    fuhrpark,
    buchhaltung,
    showroom,
    design,
    bestandsmanagement,
    haustechnik,
    unternehmensentwicklung,
    logistikSubstitute,
    vertriebSubstitute,
    hrSubstitute,
    itSubstitute,
    fuhrparkSubstitute,
    buchhaltungSubstitute,
    showroomSubstitute,
    designSubstitute,
    bestandsmanagementSubstitute,
    haustechnikSubstitute,
    unternehmensentwicklungSubstitute
  };

  const approver = await Approver.findByIdAndUpdate(id, updateApprover, {
    new: true,
  });

  if (!approver) {
    throw new ErrorResponse(404, "Activity not found!");
  } else {
    res.status(201).json(approver);
  }
});

const getAllApprovers = asyncWrapper(async (req, res, next) => {
  const approvers = await Approver.find({});

  res.status(201).json(approvers);
});

module.exports = {
  createApprover,
  editApprover,
  getAllApprovers,
};

const { Schema, model } = require("mongoose");

const approverSchema = new Schema({
  logistik: { type: String, required: true },
  vertrieb: { type: String, required: true },
  hr: { type: String, required: true },
  it: { type: String, required: true },
  fuhrpark: { type: String, required: true },
  buchhaltung: { type: String, required: true },
  einkauf: { type: String, required: true },
  design: { type: String, required: true },
  projektmanagement: { type: String, required: true },
  officemanagement: { type: String, required: true },
  logistikSubstitute: { type: String, required: true },
  vertriebSubstitute: { type: String, required: true },
  hrSubstitute: { type: String, required: true },
  itSubstitute: { type: String, required: true },
  fuhrparkSubstitute: { type: String, required: true },
  buchhaltungSubstitute: { type: String, required: true },
  einkaufSubstitute: { type: String, required: true },
  designSubstitute: { type: String, required: true },
  projektmanagementSubstitute: { type: String, required: true },
  officemanagementSubstitute: { type: String, required: true },
});

const Approver = model("Approver", approverSchema);

module.exports = Approver;

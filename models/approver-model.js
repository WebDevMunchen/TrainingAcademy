const { Schema, model } = require("mongoose");

const approverSchema = new Schema({
  logistik: { type: String, required: true },
  vertrieb: { type: String, required: true },
  hr: { type: String, required: true },
  it: { type: String, required: true },
  fuhrpark: { type: String, required: true },
  buchhaltung: { type: String, required: true },
  showroom: { type: String, required: true },
  design: { type: String, required: true },
  bestandsmanagement: { type: String, required: true },
  haustechnik: { type: String, required: true },
  unternehmensentwicklung: { type: String, required: true },
  logistikSubstitute: { type: String, required: true },
  vertriebSubstitute: { type: String, required: true },
  hrSubstitute: { type: String, required: true },
  itSubstitute: { type: String, required: true },
  fuhrparkSubstitute: { type: String, required: true },
  buchhaltungSubstitute: { type: String, required: true },
  showroomSubstitute: { type: String, required: true },
  designSubstitute: { type: String, required: true },
  bestandsmanagementSubstitute: { type: String, required: true },
  haustechnikSubstitute: { type: String, required: true },
  unternehmensentwicklungSubstitute: { type: String, required: true },
});

const Approver = model("Approver", approverSchema);

module.exports = Approver;

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
    officemanagement: { type: String, required: true }
});

const Approver = model("Approver", approverSchema);

module.exports = Approver;

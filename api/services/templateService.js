const { default: mongoose } = require("mongoose");
const Template = require("../schema/template.schema");

async function createTemplate(req) {
  const { details, type } = req.body;
  const template = new Template({ details, type, createdBy: req.user.id });
  const savedTemplate = await template.save();
  return savedTemplate;
}

async function getTemplatesOfMine(req) {
  const templates = await Template.find({
    createdBy: new mongoose.Types.ObjectId(req.user.id),
  }).populate("createdBy", "-password");
  return templates;
}

async function getTemplate(req) {
  const templateId = req.params.templateId;
  const templates = await Template.findById({
    _id: new mongoose.Types.ObjectId(templateId),
  }).populate("createdBy", "-password");
  return templates;
}

async function updateTemplate(req) {
  const { templateId, details } = req.body;
  const updatedTemplate = await Template.findByIdAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(templateId),
    },
    { $set: { details } },
    { new: true }
  );
  return updatedTemplate;
}

async function deleteTemplate(req) {
  const { templateId } = req.body;
  await Template.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(templateId),
  });
  return { message: "Deleted successfully" };
}

module.exports = {
  createTemplate,
  getTemplate,
  getTemplatesOfMine,
  updateTemplate,
  deleteTemplate,
};

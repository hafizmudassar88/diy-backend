const { default: mongoose } = require("mongoose");
const Template = require("../schema/template.schema");

async function createTemplate(req) {
  const { details } = req.body;
  const template = new Template({ details, createdBy: req.user.id });
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

// Blogs CRUD Operations
async function addBlog(req) {
  const { templateId, blogDetails } = req.body;

  const updatedTemplate = await Template.findByIdAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(templateId),
    },
    { $push: { blogs: { details: blogDetails } } },
    { new: true }
  );
  return updatedTemplate;
}

async function updateBlog(req) {
  const { templateId, blogId, blogDetails } = req.body;
  const updatedTemplate = await Template.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(templateId),
      "blogs._id": new mongoose.Types.ObjectId(blogId),
    },
    { $set: { "blogs.$.details": blogDetails } },
    { new: true }
  );
  return updatedTemplate;
}

async function deleteBlog(req) {
  const { templateId, blogId } = req.body;
  const updatedTemplate = await Template.findByIdAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(templateId),
    },
    { $pull: { blogs: { _id: new mongoose.Types.ObjectId(blogId) } } },
    { new: true }
  );
  return updatedTemplate;
}

// Researches CRUD Operations
async function addResearch(req) {
  const { templateId, researchDetails } = req.body;
  const updatedTemplate = await Template.findByIdAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(templateId),
    },
    { $push: { researches: { details: researchDetails } } },
    { new: true }
  );
  return updatedTemplate;
}

async function updateResearch(req) {
  const { templateId, researchId, researchDetails } = req.body;
  const updatedTemplate = await Template.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(templateId),
      "researches._id": new mongoose.Types.ObjectId(researchId),
    },
    { $set: { "researches.$.details": researchDetails } },
    { new: true }
  );
  return updatedTemplate;
}

async function deleteResearch(req) {
  const { templateId, researchId } = req.body;
  const updatedTemplate = await Template.findByIdAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(templateId),
    },
    { $pull: { researches: { _id: new mongoose.Types.ObjectId(researchId) } } },
    { new: true }
  );
  return updatedTemplate;
}

module.exports = {
  createTemplate,
  getTemplate,
  getTemplatesOfMine,
  updateTemplate,
  deleteTemplate,
  addBlog,
  updateBlog,
  deleteBlog,
  addResearch,
  updateResearch,
  deleteResearch,
};

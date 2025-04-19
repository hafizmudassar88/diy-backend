const { default: mongoose } = require("mongoose");
const Template = require("../schema/template.schema");

async function createTemplate(req) {
  const { details } = req.body;
  let status = 'PENDING';
  if (details?.type === "resume" || details?.type === "RESUME") {
    status = 'APPROVED';

  }
  const template = new Template({ details, createdBy: req.user.id, status });
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

async function getTemplatesByUserId(req) {
  const userId = req.params.userId;
  const templates = await Template.find({
    createdBy: new mongoose.Types.ObjectId(userId),
  }).sort({ createdBy: -1 });
  return templates;
}
const getAllTemplatesSorted = async () => {
  try {
    const statusOrder = ["PENDING", "APPROVED", "CANCELLED"];

    const templates = await Template.aggregate([
      {
        $addFields: {
          statusOrder: {
            $indexOfArray: [statusOrder, "$status"],
          },
        },
      },
      {
        $sort: { statusOrder: 1, createdAt: -1 },
      }, // Sort by custom order, then newest first
      {
        $lookup: {
          from: "users", // The collection name for Users in MongoDB
          localField: "createdBy",
          foreignField: "_id",
          as: "createdByDetails",
        },
      },
      {
        $unwind: {
          path: "$createdByDetails",
          preserveNullAndEmptyArrays: true, // Keeps templates even if user details are missing
        },
      },
      {
        $project: {
          statusOrder: 0, // Remove the temporary field
          "createdByDetails.password": 0, // Exclude sensitive fields like password
        },
      },
    ]);

    return templates;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
};

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

async function updateTemplateStatus(req) {
  const { status, templateId } = req.body;
  const updatedTemplate = await Template.findByIdAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(templateId),
    },
    { $set: { status } },
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
  getTemplatesByUserId,
  updateTemplateStatus,
  getAllTemplatesSorted,
};

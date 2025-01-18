const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "APPROVED", "CANCELLED"],
      default: "PENDING",
    },
    details: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    blogs: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        details: {
          type: Map,
          of: mongoose.Schema.Types.Mixed,
        },
      },
    ],
    researches: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        details: {
          type: Map,
          of: mongoose.Schema.Types.Mixed,
        },
      },
    ],
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", TemplateSchema);

module.exports = Template;

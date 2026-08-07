import mongoose from "mongoose";

const issueSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    issueCategory: {
      type: String,
      required: true,
    },

    issueTitle: {
      type: String,
      required: true,
    },

    issueDescription: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    landMark: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
    },

    mandal: {
      type: String,
      required: true,
    },

    pincode: {
      type: Number,
      required: true,
    },

    priority: {
      type: String,
      required:true,
    },

    images:
      {
        type: [String], // Store image URL or file path
        required: true
      },

  issueStatus : {
    type: String,
    required: true,
    enum:["Pending", "In Progress", "Resolved"]
   }
  },
);
export default mongoose.model("Issue.model", issueSchema);

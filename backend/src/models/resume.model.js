import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    analysis: {
      type: Object,
      required: true,
    },
    elo: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Resume", resumeSchema);
export default User;

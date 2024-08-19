import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "Normal",
    },
    profilepicture: {
      type: String,
    },
  },
  { timestamps: true }
);
const Usermodel = mongoose.model("User", userSchema);

export default Usermodel;

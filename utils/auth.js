import jwt from "jsonwebtoken";
import Usermodel from "../models/User.js";

export const generateUserToken = async (id) => {
  const user = await Usermodel.findById(id);

  const payload = {
    _id: user._id,
    email: user.email,
    fullname: user.fullname,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY);
  return token;
};

export const validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};

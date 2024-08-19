import Usermodel from "../models/User.js";
import bcrypt from "bcrypt";
import { generateUserToken } from "../utils/auth.js";
import blogModel from "../models/Blog.js";

export const userSignupController = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname)
      return res
        .status(400)
        .render("Signup", { error: "Fullname is required" });
    if (!email)
      return res.status(400).render("Signup", { error: "Email is required" });
    if (!password || password.length < 6)
      return res.status(400).render("Signup", {
        error: "Password is required and must contain at least 6 characters",
      });

    // Check if the email already exists
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .render("Signup", { error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await Usermodel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // generating jwt token
    const token = await generateUserToken(user._id);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.status(500).render("Signup", {
      error: "An error occurred during signup",
    });
  }
};

export const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).render("Login", {
        error: "Email and Password are required",
      });
    }

    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(400).render("Login", {
        error: "User does not exist",
      });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render("Login", {
        error: "Invalid password",
      });
    }
    // generating JWT token
    const token = await generateUserToken(user._id);

    // Successful login
    return res.cookie("token", token).status(200).redirect("/");
  } catch (error) {
    return res.status(500).render("Login", {
      error: "An error occurred during login",
    });
  }
};

export const userLogoutController = (req, res) => {
  return res.clearCookie("token").redirect("/");
};

export const renderUserBlogs = async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const blogs = await blogModel.find({ createdBy: req.user._id });
  return res.render("userBlogs", {
    user: req.user,
    blogs,
  });
};

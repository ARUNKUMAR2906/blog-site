import express from "express";
import {
  userSignupController,
  userLoginController,
  userLogoutController,
  renderUserBlogs,
} from "../controllers/userController.js";
import { ensureAuthenticated } from "../middlewares/auth.js";

const Router = express.Router();

Router.post("/login", userLoginController);
Router.post("/signup", userSignupController);
Router.get("/logout", userLogoutController);
Router.get("/blogs", ensureAuthenticated, renderUserBlogs);
export default Router;

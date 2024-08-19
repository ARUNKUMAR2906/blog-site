import express from "express";
import {
  renderHomePageController,
  renderSignupPageController,
  renderLoginPageController
} from "../controllers/staticController.js";

const Router = express.Router();

Router.get("/", renderHomePageController);
Router.get("/signup", renderSignupPageController);
Router.get("/login", renderLoginPageController);

export default Router;

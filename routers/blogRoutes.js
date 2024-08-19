import express from "express";
import {
  handleCreateblog,
  handlePostBlog,
  handleBlogViewPage,
  handleDeleteBlog,
} from "../controllers/blogController.js";
import { grantAccessTo } from "../middlewares/auth.js";
import { ensureAuthenticated } from "../middlewares/auth.js";

const Router = express.Router();

Router.get("/create", ensureAuthenticated, handleCreateblog);
Router.post("/create", ensureAuthenticated, handlePostBlog);
Router.get("/view/:id", handleBlogViewPage);
Router.get("/delete/:id", grantAccessTo("Admin"), handleDeleteBlog);

export default Router;

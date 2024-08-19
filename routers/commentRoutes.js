import express from "express";
import { handlePostComment } from "../controllers/commentController.js";
import { ensureAuthenticated } from "../middlewares/auth.js";

const Router = express.Router();

Router.post("/create", ensureAuthenticated, handlePostComment);

export default Router;

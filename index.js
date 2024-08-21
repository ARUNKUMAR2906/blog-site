import express from "express";
import userRouters from "./routers/userRoutes.js";
import blogRouters from "./routers/blogRoutes.js";
import staticRouters from "./routers/staticRoutes.js";
import commentRouters from "./routers/commentRoutes.js";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { checkForToken } from "./middlewares/auth.js";

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.mongoDB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("Error while connecting to MongoDB:", err));

// configuration
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(checkForToken);

// routes
app.use("/user", userRouters);
app.use("/blog", blogRouters);
app.use("/", staticRouters);
app.use("/comment", commentRouters);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import multer from "multer";
import path from "path";
import blogModel from "../models/Blog.js";
import commentModel from "../models/comment.js";

export const handleCreateblog = (req, res) => {
  res.render("Createblog", { user: req.user });
};

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination for uploaded files
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    // Use the original file name or create a unique name for the file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Route handler for blog post creation
export const handlePostBlog = async (req, res) => {
  upload.single("coverImage")(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .render("Createblog", { error: "File upload failed.", user: req.user });
    }

    const { title, content } = req.body;

    // Debugging logs
    // console.log("Title:", title);
    // console.log("Content:", content);

    if (!title || !content) {
      return res.status(400).render("Createblog", {
        error: "Title and content are required.",
        user: req.user,
      });
    }

    try {
      const blog = await blogModel.create({
        title,
        content,
        coverImage: req.file.filename,
        createdBy: req.user._id,
      });
      res.render("Createblog", {
        message: "Blog created successfully",
        user: req.user,
      });
    } catch (err) {
      console.error("Error creating blog post:", err);
      res.status(500).send("Blog creation failed.");
    }
  });
};

export const handleBlogViewPage = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogModel
      .findByIdAndUpdate(id, { $inc: { views: 1 } })
      .populate("createdBy");

    if (!blog) {
      return res.status(404).render("404", { user: req.user });
    }

    // Fetch comments related to the blog
    const comments = await commentModel
      .find({ blogId: blog._id })
      .populate("createdBy");

    res.render("blog", {
      user: req.user,
      blog,
      comments, // Passing the comments to the view
    });
  } catch (error) {
    console.error("Error fetching blog or comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleDeleteBlog = async (req, res) => {
  await blogModel.deleteOne({ _id: req.params.id });
  return res.redirect("/");
};

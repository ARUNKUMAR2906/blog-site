import blogModel from "../models/Blog.js";
export const renderHomePageController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    res.render("Home", {
      user: req.user,
      blogs, // Passing blogs to the view
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).render("Home", {
      user: req.user,
      blogs: [], // In case of error, pass an empty array to avoid undefined issues
    });
  }
};

export const renderSignupPageController = (req, res) => {
  if (req.user) return res.redirect("/");
  res.render("Signup");
};
export const renderLoginPageController = (req, res) => {
  if (req.user) return res.redirect("/");
  res.render("Login");
};

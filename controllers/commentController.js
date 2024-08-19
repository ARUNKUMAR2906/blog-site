import commentModel from "../models/comment.js";

export const handlePostComment = async (req, res) => {
  if (!req.user) return res.json({ error: "You are not logged in" });
  const { blogId, content } = req.body;
  await commentModel.create({ blogId, content, createdBy: req.user._id });
  return res.json({ message: "success" });
};

const express = require("express");
const router = express.Router();
const comment = require("../model/comment.js");
const jwt = require("../utilities/jwt.js");
// GET /api/comments
router.get("/", async (req, res) => {
  try {
    const comments = await comment.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving comments", error: error.toString() });
  }
});
router.get("/video/:vid", async (req, res) => {
  try {
    const comments = await comment.getVideoComments();
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving comments", error: error.toString() });
  }
});
router.get("/post/:postid", async (req, res) => {
  try {
    const comments = await comment.getPostComments();
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving comments", error: error.toString() });
  }
});
// POST /api/comment
router.post("/", jwt.verifyLogin, async (req, res) => {
  try {
    const commentData = req.body;
    const identifier = req.identifier;
    console.log(commentData);
    const newComment = await comment.addComment(identifier, commentData);
    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.toString() });
  }
});

// PUT /api/comments/:cid
router.put("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const commentData = req.body;
    const updatedComment = await comment.updateComment(cid, commentData);
    res.status(200).json(updatedComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.toString() });
  }
});

// DELETE /api/comments/:cid
router.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    await comment.deleteComment(cid);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.toString() });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const post = require("../model/post.js"); // 假設有一個 post 模組來處理 SQL 操作

// GET /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await post.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving posts", error: error.toString() });
  }
});

// POST /api/posts
router.post("/", async (req, res) => {
  try {
    const postData = req.body;
    const newPost = await post.addPost(postData);
    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding post", error: error.toString() });
  }
});

router.put("/:postid", async (req, res) => {
  try {
    const postid = req.params.postid;
    const postData = req.body;
    const updatedPost = await post.updatePost(postid, postData);
    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.toString() });
  }
});

router.delete("/:postid", async (req, res) => {
  try {
    const postid = req.params.postid;
    await post.deletePost(postid);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.toString() });
  }
});

module.exports = router;

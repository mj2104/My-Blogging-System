const express = require("express");
const Post = require("../models/post");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ======================================================
// CREATE A NEW BLOG POST
// POST /api/posts
// ======================================================

router.post("/", authMiddleware, async function (req, res) {

    try {

        const { title, content } = req.body;


        // Validate input
        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }


        // Create new post
        const post = new Post({
            title: title,
            content: content,
            author: req.userId
        });


        // Save post to MongoDB
        await post.save();


        res.status(201).json({
            message: "Post created successfully",
            post: post
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ======================================================
// GET ALL BLOG POSTS
// GET /api/posts
// ======================================================

router.get("/", async function (req, res) {

    try {

        const posts = await Post.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });


        res.status(200).json(posts);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ======================================================
// GET ONE BLOG POST
// GET /api/posts/:id
// ======================================================

router.get("/:id", async function (req, res) {

    try {

        const post = await Post.findById(req.params.id)
            .populate("author", "name email");


        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }


        res.status(200).json(post);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ======================================================
// UPDATE BLOG POST
// PUT /api/posts/:id
// ======================================================

router.put("/:id", authMiddleware, async function (req, res) {

    try {

        const { title, content } = req.body;


        // Find the post
        const post = await Post.findById(req.params.id);


        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }


        // Check if the logged-in user owns the post
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({
                message: "You can only edit your own posts"
            });
        }


        // Validate input
        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }


        // Update post
        post.title = title;
        post.content = content;


        await post.save();


        res.status(200).json({
            message: "Post updated successfully",
            post: post
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ======================================================
// DELETE BLOG POST
// DELETE /api/posts/:id
// ======================================================

router.delete("/:id", authMiddleware, async function (req, res) {

    try {

        // Find the post
        const post = await Post.findById(req.params.id);


        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }


        // Check if the logged-in user owns the post
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({
                message: "You can only delete your own posts"
            });
        }


        // Delete post
        await Post.findByIdAndDelete(req.params.id);


        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


module.exports = router;
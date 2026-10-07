const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Register a new user
router.post("/register", async function (req, res) {

    try {

        const { name, email, password } = req.body;


        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email and password"
            });
        }


        // Check if email already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });


        // Save user to MongoDB
        await user.save();


        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});

// Login user
router.post("/login", async function (req, res) {

    try {

        const { email, password } = req.body;


        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }


        // Find user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        // Send response
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});

// Protected test route
router.get("/profile", authMiddleware, async function (req, res) {

    try {

        const user = await User.findById(req.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "You are authenticated!",
            user: user
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});

module.exports = router;
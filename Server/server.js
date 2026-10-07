const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


// Test route
app.get("/", function (req, res) {
    res.send("Blogging System Backend is Running!");
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(function () {

        console.log("MongoDB connected successfully!");

        app.listen(PORT, function () {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    })
    .catch(function (error) {

        console.log("MongoDB connection failed:");
        console.log(error.message);

    });
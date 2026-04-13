const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Schema
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String
});

const Project = mongoose.model("Project", projectSchema);

// Home route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// Add demo project (for testing via browser)
app.get("/add-project", async (req, res) => {
    const existing = await Project.findOne({ title: "My Portfolio" });

    if (existing) {
        return res.send("Project already exists");
    }

    const project = new Project({
        title: "My Portfolio",
        description: "First full stack project",
        link: "https://github.com/"
    });

    await project.save();
    res.send("Project added successfully!");
});
// Get all projects
app.get("/projects", async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});
app.get("/clear", async (req, res) => {
    await Project.deleteMany({});
    res.send("All projects deleted");
});
// IMPORTANT: PORT 3000 (since 5000 had issue)
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
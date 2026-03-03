const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET /api/projects — List live projects (portfolio)
router.get("/", async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = { status: "live" };
    if (category && category !== "All") filter.category = category;
    if (featured) filter.featured = true;

    const projects = await Project.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .lean();

    res.json({ projects, total: projects.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST /api/projects — Create project (admin)
router.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

// PATCH /api/projects/:id — Update project
router.patch("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project" });
  }
});

// DELETE /api/projects/:id
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;

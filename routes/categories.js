const express = require("express");
const router = express.Router();
const pool = require("../db/db");

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);

    res.redirect("/");
  } catch (err) {
    console.error("Error inserting category:", err);
    res.status(500).send("Error creating category");
  }
});

router.get("/new", (req, res) => {
  res.render("categories/new", { category: null });
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch category details
    const categoryResult = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [id]
    );
    const category = categoryResult.rows[0];

    if (!category) {
      return res.status(404).send("Category not found");
    }

    // Render the same form with pre-filled data
    res.render("categories/new", { category });
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).send("Error fetching category");
  }
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).send("Error updating category");
  }
});

router.post("/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).send("Error deleting category");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../db/db");

router.post("/", async (req, res) => {
  const { name, price, category_id } = req.body;

  try {
    if (category_id) {
      await pool.query(
        "INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3)",
        [name, price, category_id]
      );
    } else {
      await pool.query("INSERT INTO products (name, price) VALUES ($1, $2)", [
        name,
        price,
      ]);
    }

    res.redirect("/");
  } catch (err) {
    console.error("Error inserting product:", err);
    res.status(500).send("Error creating product");
  }
});

router.get("/new", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    const categories = result.rows;

    res.render("./products/new", { product: null, categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching categories");
  }
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch product details
    const productResult = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    const product = productResult.rows[0];

    // Fetch categories for the dropdown
    const categoriesResult = await pool.query("SELECT * FROM categories");
    const categories = categoriesResult.rows;

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Render the same form with pre-filled data
    res.render("products/new", { product, categories });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send("Error fetching product");
  }
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, category_id } = req.body;

  try {
    if (category_id) {
      await pool.query(
        "UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4",
        [name, price, category_id, id]
      );
    } else {
      await pool.query(
        "UPDATE products SET name = $1, price = $2, category_id = NULL WHERE id = $3",
        [name, price, id]
      );
    }
    res.redirect("/");
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Error updating product");
  }
});

router.post("/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send("Error deleting product");
  }
});

module.exports = router;

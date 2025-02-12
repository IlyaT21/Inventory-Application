const express = require("express");
const app = express();
const pool = require("./db/db");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    // Fetch categories from the database
    const categoriesResult = await pool.query("SELECT * FROM categories");
    const categories = categoriesResult.rows;

    // Fetch products from the database
    const productsResult = await pool.query("SELECT * FROM products");
    const products = productsResult.rows;

    res.render("index", { categories, products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.post("/product", async (req, res) => {
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

app.get("/product/new", async (req, res) => {
  try {
    // Fetch categories to allow assigning a product to a category (optional)
    const result = await pool.query("SELECT * FROM categories");
    const categories = result.rows;

    res.render("products/new", { categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching categories");
  }
});

app.get("/product/edit", (req, res) => {
  res.render("products/edit");
});

app.post("/category", async (req, res) => {
  const { name } = req.body;

  try {
    await pool.query(
      "INSERT INTO categories (name) VALUES ($1)",
      [name]
    );

    res.redirect("/");
  } catch (err) {
    console.error("Error inserting category:", err);
    res.status(500).send("Error creating category");
  }
});

app.get("/category/new", (req, res) => {
  res.render("categories/new");
});

app.get("/category/edit", (req, res) => {
  res.render("categories/edit");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));

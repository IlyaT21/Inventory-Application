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

app.get("/product/new", (req, res) => {
  res.render("products/new");
});

app.get("/product/edit", (req, res) => {
  res.render("products/edit");
});

app.get("/category/new", (req, res) => {
  res.render("categories/new");
});

app.get("/category/edit", (req, res) => {
  res.render("categories/edit");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));

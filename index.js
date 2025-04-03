const express = require("express");
const app = express();
const pool = require("./db/db");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

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

app.use("/product", productRoutes);
app.use("/category", categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));

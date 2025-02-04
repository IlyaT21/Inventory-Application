// app.js
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
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

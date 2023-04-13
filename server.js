const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Article = require("./models/article");
const methodOverride = require("method-override");

const articleRouter = require("./routes/articles");

mongoose.connect("mongodb://127.0.0.1/blog");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/articles", articleRouter);
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index.ejs", { articles: articles });
});

app.listen(5000, () => {
  console.log("server up and running");
});

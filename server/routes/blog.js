const express = require("express");
const router = express.Router();
const {
  create,
  getAllArticles,
  singleArticle,
  update
} = require("../controllers/blog-controller.js");

router.post("/create", create);
router.get("/articles", getAllArticles);
router.get("/article/:slug", singleArticle);
router.put("/article/:slug", update);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  create,
  getAllArticles
} = require("../controllers/blog-controller.js");

router.post("/create", create);
router.get("/articles", getAllArticles);

module.exports = router;

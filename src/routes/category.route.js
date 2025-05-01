const express = require("express");
const {
  createCategory,
  getAllCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.post("/create", createCategory);

router.get("/all", getAllCategory);

module.exports = router;

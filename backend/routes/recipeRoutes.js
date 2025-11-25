const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

router.post("/search", Controllers.recipeController.searchRecipes);

module.exports = router;
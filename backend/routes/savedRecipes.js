const express = require("express");
const router = express.Router();

const { SavedRecipe } = require("../models");
const auth = require("../middleware/auth");

// SAVE a recipe
router.post("/", auth, async (req, res) => {
  try {
    const saved = await SavedRecipe.create({
      userID: req.user._id,       // or req.user if you changed auth
      recipeID: req.body.recipeID,
      title: req.body.title,
      image: req.body.image,
    });

    res.json(saved);
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ message: "Error saving recipe" });
  }
});

// GET all saved recipes for that user
router.get("/", auth, async (req, res) => { //before express runs auth checks the user's token
  try {
    const saved = await SavedRecipe.find({ userID: req.user._id }); // no populate
    res.json(saved);
  } catch (error) {
    console.error("Error loading saved recipes:", error);
    res.status(500).json({ message: "Error loading saved recipes" });
  }
});

module.exports = router;
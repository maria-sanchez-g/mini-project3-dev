// calls Forkify API with ingredients

const axios = require("axios");

const searchRecipes = async (req, res) => {
  // console.log("BODY RECEIVED:", req.body);
  try {
    const { ingredients } = req.body;

    if (!ingredients) {
      return res.status(400).json({ message: "Ingredients are required" });
    }

    const query = Array.isArray(ingredients)
      ? ingredients.join(",")
      : ingredients; // already a string

    const forkifyUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`;

    const response = await axios.get(forkifyUrl);

    res.status(200).json({
      recipes: response.data.data.recipes,
    });
  } catch (err) {
    console.error("Forkify error:", err.response?.data || err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const response = await axios.get(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${req.params.id}`
    );
    res.status(200).json({ recipe: response.data.data.recipe });
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

module.exports = {
  searchRecipes,
  getRecipeById,
};

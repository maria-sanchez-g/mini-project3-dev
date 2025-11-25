// calls Forkify API with ingredients

const axios = require("axios");

const searchRecipes = async (req, res) => {
  // console.log("BODY RECEIVED:", req.body);
  try {
    const { ingredients } = req.body;
    const query = ingredients.join(",");
    const forkifyUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
    const response = await axios.get(forkifyUrl);
    res.send({
      result: 200,
      data: response.data.data.recipes,
    });
  } catch (err) {
    res.status(500).send({ result: 500, error: err.message });
  }
};

module.exports = { searchRecipes };

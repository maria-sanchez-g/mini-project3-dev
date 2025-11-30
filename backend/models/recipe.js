const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {type: String},
  image_url: {type: String},
  source_url: {type: String},
  publisher: {type: String},
  recipe_id: {type: String},
});

module.exports = mongoose.model("Recipe", recipeSchema);

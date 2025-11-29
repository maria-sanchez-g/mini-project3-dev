const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedRecipeSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // store Forkify recipe id as string
    recipeID: {
      type: String,
      required: true,
    },
    title: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SavedRecipe", savedRecipeSchema);

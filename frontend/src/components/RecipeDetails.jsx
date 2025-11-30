import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // r-r-d access to url params
import axios from "axios";
import api from "../api/axios";


export default function RecipeDetails() {
  // extract id from route params
  const { id } = useParams();
  // store recipe data in react useState
  const [recipe, setRecipe] = useState(null);

  // run when comp mounts and when id changes
  useEffect(() => {
    const loadRecipe = async () => {
      try {
        // fetch recipe details from Forkify api
        const res = await axios.get(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );

        // update state with fetched recipe data
        setRecipe(res.data.data.recipe);
      } catch (err) {
        console.error("Failed to load recipe:", err);
      }
    };

    // call loadRecipe function
    loadRecipe();
    // dependency array
  }, [id]); // run effect if id changes

  async function handleSave() {
    if (!recipe) return;

    try {
      await api.post(
        "/saved",
        {
          recipeID: recipe.id,       // Forkify recipe ID
          title: recipe.title,
          image: recipe.image_url,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Recipe saved!");
    } catch (err) {
      console.error("Error saving recipe:", err);
      alert("You must be logged in to save recipes.");
    }
  }

  // loading message
  if (!recipe) return <p>Loading…</p>;

  // render recipe details
  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image_url} alt={recipe.title} width="300" />
      <button onClick={handleSave}>Save Recipe</button>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {/* Display quantity, unit, and description */}
            {ingredient.quantity || ""} {ingredient.unit || ""} — {ingredient.description}
          </li>
        ))}
      </ul>

      <h3>Publisher</h3>
      <p>{recipe.publisher}</p>

      {/* Link to full recipe on the source website */}
      <a href={recipe.source_url} target="_blank">
        Full Method (source website)
      </a>

      {/* possible TODO: scrap source website for recipe method */}
    </div>
  );
}

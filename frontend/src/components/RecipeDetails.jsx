import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const res = await axios.get(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );

        setRecipe(res.data.data.recipe);
      } catch (err) {
        console.error("Failed to load recipe:", err);
      }
    };

    loadRecipe();
  }, [id]);

  if (!recipe) return <p>Loading…</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image_url} alt={recipe.title} width="300" />

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((i, index) => (
          <li key={index}>
            {i.quantity || ""} {i.unit || ""} — {i.description}
          </li>
        ))}
      </ul>

      <h3>Publisher</h3>
      <p>{recipe.publisher}</p>

      <a href={recipe.source_url} target="_blank">
        Full Method (source website)
      </a>
    </div>
  );
}

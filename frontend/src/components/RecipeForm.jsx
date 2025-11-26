import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RecipeForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      ingredients: [{ name: "" }], //start with empty ingredient
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const [results, setResults] = useState([]);

  // Submit form to search recipes
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      // Convert ingredients array to comma-separated string
      const ingredientsString = data.ingredients.map((i) => i.name).join(",");
      const res = await axios.post("http://localhost:8080/api/recipes/search", {
        ingredients: ingredientsString,
      });
      setResults(res.data.recipes || []); // depends on Forkify API response
    } catch (err) {
      console.error(err);
    }
  };

  // Save a recipe to the backend (MongoDB)

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Search Recipes</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} style={{ marginBottom: "0.5rem" }}>
            <input
              {...register(`ingredients.${index}.name`)}
              placeholder={`Ingredient ${index + 1}`}
              style={{ marginRight: "0.5rem" }}
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={() => append({ name: "" })}>
          Add Ingredient
        </button>

        <button type="submit" style={{ display: "block", marginTop: "1rem" }}>
          Search
        </button>
      </form>

      {/* RESULTS */}
      <h3>Results:</h3>
      {results.length === 0 ? (
        <p>No results yet...</p>
      ) : (
        <ul>
          {results.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RecipeForm() {

  // inititiate r-h-f state with useForm()
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      ingredients: [{ name: "" }], //start with empty ingredient
    },
  });
      // destructure useForm() object
          // register     - connect input fields to r-h-f state
          // control      - keeps internal form state in sync
          //              - rqd for useFieldArray to track dynamic array state
          // handleSubmit - onSubmit wrapper
          //              - validates & passes form data to submit handler


  // r-h-f useFieldArray()
  const { fields, append, remove } = useFieldArray({
    // control tracks form state 
    control,
    name: "ingredients", // keep ingredients in sync with form state
  });
      // destructure props of useFieldArray() object
      // useFieldArray handles dynamic form fields (add/remove ingredient)
          // fields = current array of ingredient inputs
          // append, remove = helper functions - dynamically change form fields 


  // react state  
  const [results, setResults] = useState([]);
      // use to store recipe search results returned from the backend


  // Submit form to search recipes
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      // Convert ingredients array to comma-separated string
      const ingredientsString = data.ingredients.map((i) => i.name).join(",");

      // send POST req 
      const res = await axios.post("http://localhost:8080/api/recipes/search", {
        // req.body,  data = k:v pair of ingredientsString 
        ingredients: ingredientsString,
      });
      // console.log(ingredientsString); // check ingredientsString value
     
      // update results state
      setResults(res.data.recipes || []); 
          // depends on Forkify API response
          // res returns data.recipes from axios call
    } catch (err) {
      console.error(err);
    }
  };

  // TODO: Save a recipe to the backend (MongoDB)

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Search Recipes</h2>
      {/* r-h-f calls onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* loop through ingredients array from r-h-f useFieldArray */}
        {fields.map((field, index) => (
          <div key={field.id} style={{ marginBottom: "0.5rem" }}>
            {/* register each input to ingredients array */}
            <input
              {...register(`ingredients.${index}.name`)}
              placeholder={`Ingredient ${index + 1}`}
              style={{ marginRight: "0.5rem" }}
            />
            {/* remove ingredient - useFieldArray fn */}
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}

        {/* append ingredient - useFieldArray fn */}
        <button type="button" onClick={() => append({ name: "" })}>
          Add Ingredient
        </button>

        <button type="submit" style={{ display: "block", marginTop: "1rem" }}>
          Search
        </button>
      </form>

      {/* results */}
      <h3>Results:</h3>
      {results.length === 0 ? (
        <p>No results yet...</p>
      ) : (
        <ul>
          {/* map results react state */}
          {results.map((recipe) => (
            <li key={recipe.id}>
              {/* link navigates to the recipe details page using recipe.id */}
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

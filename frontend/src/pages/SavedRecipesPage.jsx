import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { BackButton } from "../components/BackButton";

export function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSaved() {
      try {
        const res = await api.get("/saved", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //JWT token
          },
        });

        setSavedRecipes(res.data || []);
      } catch (err) {
        console.error("Failed to load saved recipes", err);
        setError("Could not load saved recipes. Please log in first.");
      } finally {
        setLoading(false);
      }
    }

    loadSaved();
  }, []);

  if (loading) return <p>Loading saved recipes…</p>;

  if (error) return <p>{error}</p>;

  if (savedRecipes.length === 0)
    return (
      <div>
        <BackButton />
        <h1>My Saved Recipes</h1>
        <p>You do not have any saved recipes yet.</p>
      </div>
    );

  return (
    <div>
      <BackButton />
      <h1>My Saved Recipes</h1>

      <ul style={styles.list}>
        {savedRecipes.map((r) => (
          <li key={r._id} style={styles.card}>
            {r.image && (
              <img
                src={r.image}
                alt={r.title}
                style={{ width: "150px", borderRadius: "8px" }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h3>{r.title}</h3>
              {/* Link back to the recipe details page using recipeID */}
              <Link to={`/recipe/${r.recipeID}`}>View details</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  card: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
  },
};

// import routing components
import { Routes, Route } from "react-router-dom";

// page components to render for specific URLs
import { HomePage } from "../pages/HomePage";
import { RecipeDetailsPage } from "../pages/RecipeDetailsPage";

export function AppRoutes(props) {
  return (
    <Routes>
      {/* index matches on default/home URL: / */}
      <Route index element={<HomePage {...props} />} />
      {/* pass id to RecipeDetail page with dynamic */}
      <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
    </Routes>
  );
}

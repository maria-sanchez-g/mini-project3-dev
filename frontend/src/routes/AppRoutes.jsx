// import routing components
import { Routes, Route } from "react-router-dom"

// page components to render for specific URLs
import { HomePage } from "../pages/HomePage"
import { FirstPage } from "../pages/FirstPage"
import { RecipeDetailsPage } from "../pages/RecipeDetailsPage";
import { LoginPage } from "../pages/LoginPage"
import { SavedRecipesPage } from "../pages/SavedRecipesPage";

export function AppRoutes(props) {
  return (
    <Routes>
      {/* index matches on default/home URL: / */}
      <Route index element={<FirstPage/>} />
      <Route path="/recipe/:id" element={<RecipeDetailsPage />}/>
      <Route path="/recipe" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/saved" element={<SavedRecipesPage />} />
    </Routes>
  );
}

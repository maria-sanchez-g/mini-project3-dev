import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { RecipeDetailsPage } from "../pages/RecipeDetailsPage"

export function AppRoutes(props) {
  return (
    <Routes>
      {/* index matches on default/home URL: / */}
      <Route index element={<HomePage {...props} />} />
      <Route path="/recipe/:id" element={<RecipeDetailsPage />}/>
    </Routes>
  );
}

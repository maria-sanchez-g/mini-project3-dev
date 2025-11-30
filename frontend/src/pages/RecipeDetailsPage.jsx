import RecipeDetails from "../components/RecipeDetails"
import { BackButton } from "../components/BackButton";


export function RecipeDetailsPage() {
    return (
        <>
        {/* component that displays details of selected recipe */}
        <BackButton />
        <RecipeDetails />
        </>
    )
}
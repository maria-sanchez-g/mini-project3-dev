import RecipeForm from "../components/RecipeForm"

export function HomePage() {
    return (
        <>
            <h1>Recipe form</h1>

            {/* page contains react-hook-form where users 
                can enter ingredients to search for recipes */}
            <RecipeForm />
        </>
    )
}
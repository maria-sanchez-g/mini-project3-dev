import LoginForm from "../components/LoginForm"
import { BackButton } from "../components/BackButton";


export function LoginPage() {
    return (
        <>
        <BackButton />
            <h1>LoginPage</h1>
        <LoginForm />
        </>
    )
}
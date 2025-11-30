import { Link } from "react-router-dom";

export function FirstPage() {
  return (
    <div style={styles.container}>
      <h1>Welcome</h1>

      <div style={styles.buttons}>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/recipe" style={styles.button}>Search Recipes</Link>
        <Link to="/saved" style={styles.button}>My Saved Recipes</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    paddingTop: "50px",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "200px",
    margin: "30px auto",
  },
  button: {
    padding: "12px",
    background: "#4CAF50",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "18px",
    textAlign: "center"
  }
};
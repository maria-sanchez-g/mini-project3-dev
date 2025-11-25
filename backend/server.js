const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
// const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/dbConnect");

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(errorHandler);

connectDB();

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => {
    res.send("Mini project 3 group exercise")
})


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port:${port}`));

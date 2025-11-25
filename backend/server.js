const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
// const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/dbConnect");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(errorHandler);

const port = process.env.PORT || 8080;

connectDB();

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Mini project 3 group exercise")
})




app.listen(port, () => console.log(`Server running on port:${port}`));

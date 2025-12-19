const express = require("express"); //In Node.js, require() is the built-in function used to import code from another file.
const cors = require("cors");
const colors = require("colors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// database connection logic
const connectDB = require("./config/dbConnect");


// create express application instance
const app = express();

// middleware
// allow frontend to talk to backend
app.use(cors());
// auto parse JSON requests into JS objects - store them in req.body.
app.use(express.json());
// parse form data into req.body - true allows parsing arrays
app.use(express.urlencoded({ extended: true }));

// connect to mongodb
connectDB();

// import external routes
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const savedRecipeRoutes = require("./routes/savedRecipes");

// use imported routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/saved", savedRecipeRoutes);  

app.get("/", (req, res) => {
  res.send(`Mini project 4 exercise<br>Express Backend`);
});

// set port
const port = process.env.PORT || 8080;

// Create HTTP server from Express app
const server = http.createServer(app);

//create socket.io server
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", //to allow the vite frontend origin
    methods: ["GET", "POST"]
  }
});

//bot knowledge base (predefined Q/A)
const BOT_RESPONSES = [
  {
    match: ["hello", "hi"],
    answer: "Hello. How can I help you today?"
  },
  {
    match: ["how do i save", "save recipe", "saving"],
    answer: "To save a recipe, open a recipe and click the Save button. Then check your Saved page."
  },
  {
    match: ["login", "sign in"],
    answer: "Go to the Login page and enter your credentials. If you do not have an account, register first."
  },
  {
    match: ["contact", "support"],
    answer: "For support, please email support@example.com (replace with your real support contact)."
  }
];

//matcher checks
function getBotReply(userText) {
  const text = (userText || "").toLowerCase();

  for (const item of BOT_RESPONSES) {
    const matched = item.match.some((keyword) => text.includes(keyword));
    if (matched) return item.answer;
  }

  return "Thanks. I can answer questions about login, saving recipes, and using the app.";
}

//Socket.IO events
io.on("connection", (socket) => { //This function runs every time a new client connects. runs once per client, use it only to server
  console.log("Socket connected:", socket.id); //socket.id is a unique identifier assigned to that client

  // Welcome message to just this user
  socket.emit("chat:bot_response", { //socket.emit(...) sends a message only to this connected client, not to everyone.
    text: "Welcome. Ask me a question using the quick buttons, or type your own question."
  });

  // When client sends a message, respond with a predefined answer
  socket.on("chat:message", (payload) => { //socket.on Use when you want to listen to events from one specific client
    // payload example: { text: "How do I save a recipe?" }
    const userText = payload?.text || ""; //payload?.text uses optional chaining. This prevents errors if payload is undefined or null.
    const botText = getBotReply(userText); //Take the user’s message. Match it against predefined questions

    // Send response back to the same user
    socket.emit("chat:bot_response", { text: botText }); //socket.emit, use when you want to send data to one specific client. Sends the bot’s reply only to the user who asked the question. This keeps conversations private
  });

  socket.on("disconnect", () => { //"disconnect" is a built-in Socket.IO event.
    console.log("Socket disconnected:", socket.id);
  });
})












// start server
server.listen(port, () => console.log(`Server running on port:${port}`));
// Socket.IO must attach to a real HTTP server, not to the Express app.
// Express (app) is not a server.
// It is a request handler. That's why we changed from app.listen(port...) to server.listen(port...)
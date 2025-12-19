## Mini Project 4

#Stack:
+ Node 
+ Express 
+ Mongoose 
+ CORS // Allows frontend-backend communication. Browsers block requests between different domains for security.
+ jsonwebtoken //To create a login token that the frontend stores and uses to access protected routes.
+ dotenv
+ colors //colors is a small Node.js package that lets you add colours and styles to the text you print in the terminal.
+ nodemon
	Update package.json scripts:
	"scripts": {
  		"start": "node server.js",
  		"dev": "nodemon server.js"
		}
+ axios
+ react-router-dom //Library that allows you to create pages inside a React application.

		backend:
		npm install express mongoose cors dotenv jsonwebtoken colors
		npm install --save-dev nodemon

		frontend:
		npm install axios react-router-dom


#App requirements:
+ User register an account. Information is saved in MongoDB database.
+ User login.
+ User navigate to ingredients page and enters ingredients in a React form.
+ backend calls Forkify API to search recipes using those ingredients.
+ User saves a recipe.
+ Recipe is saved to their MongoDB user account.
+ User navigates to My recipes page.

#App structure:

backend/
  node_modules/
  config/
    dbConnect.js
controllers/
	index.js
	recipeController.js
	userController.js
  middleware/
    auth.js
  models/
	user.js
    savedRecipe.js
  routes/
    userRoutes.js
    savedRoutes.js
	recipeRoutes.js
  .env
  package.json
  server.js

frontend/
  index.html
  package.json
  vite.config.js
  src/
    main.jsx
    App.jsx
    api/
      axios.js
    components/
      BackButton.jsx
	  LoginForm.jsx
	  RecipeDetails.jsx
	  RecipeForm.jsx
    pages/
	  FirstPage.jsx
      LoginPage.jsx
      RegisterPage.jsx
      RecipeDetailsPage.jsx
      SavedRecipesPage.jsx






How to run:

In the backend folder run:
npm run dev

You should see:
MongoDB connected: ...
Server running on port 8080

In the frontend folder run:
npm run dev



---socket.io

1-in miniprject4
-install socket npm install socket.io

2-Update backend/server.js to use an HTTP server + Socket.IO
-in backend

3-Update .env file
FRONTEND_URL=http://localhost:5173

4- frontend changes
Install socket.io

5- frontend / api / socket.js
create a reusable socket client

create .env file and include VITE_SOCKET_URL=

6- Build the ChatWidget component
frontend/src/components/ChatWidget.jsx

7- Render the widget on every page
frontend/src/App.jsx:<ChatWidget />

//TESTING
frontend
http://localhost:5173/


backend
http://localhost:8080


//NEW ADDITIONS, SOCKET.IO
“I added Socket.IO to create a real-time chat widget.”
“Frontend emits chat:message events; backend listens and responds with chat:bot_response.”
“This demonstrates event-driven, bidirectional communication in a client/server model.”
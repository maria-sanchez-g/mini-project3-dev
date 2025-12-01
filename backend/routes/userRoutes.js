const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

router.post("/login", Controllers.userController.loginUser); // When someone sends POST to /api/users/login --> run loginUser()
router.post("/register", Controllers.userController.createUser);
// RESTful User CRUD routes
router
    .route("/")
    .get(Controllers.userController.getAllUsers)  // GET  /api/users/ --> list all users

router  
    .route("/:id")
    .get(Controllers.userController.getUser)
    .put(Controllers.userController.updateUser)
    .delete(Controllers.userController.deleteUser);

module.exports = router;

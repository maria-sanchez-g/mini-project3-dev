const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// RESTful User CRUD routes
router
  .route("/")
  .get(Controllers.userController.getAllUsers)
  .post(Controllers.userController.createUser);

router
  .route("/:id")
  .get(Controllers.userController.getUser)
  .put(Controllers.userController.updateUser)
  .delete(Controllers.userController.deleteUser);

router.post("/register", Controllers.userController.registerUser);
router.post("/login", Controllers.userController.loginUser);

module.exports = router;

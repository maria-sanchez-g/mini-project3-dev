const express = require("express");
const router = express.Router();

const Controllers = require("../controllers")

router
    .route("/")
    .get(Controllers.userController.getAllUsers)
    .post(Controllers.userController.createUser);

router  .route("/:id")
    .put(Controllers.userController.updateUser)
    .delete(Controllers.userController.deleteUser);

module.exports = router;
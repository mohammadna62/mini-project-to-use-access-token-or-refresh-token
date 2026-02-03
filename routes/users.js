const express = require("express");
const usersController = require("./../controllers/users");

const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(usersController.getAll)
  .post(usersController.register);

usersRouter
  .route("/:id")
  .get(usersController.getOne)
  .delete(usersController.remove);

module.exports = usersRouter;

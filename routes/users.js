const express = require("express");
const usersController = require("./../controllers/users");
const verifyToken = require("./../middlewares/verifyToken")

const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(verifyToken,usersController.getAll)
  .post(usersController.register);

usersRouter
  .route("/:id")
  .get(usersController.getOne)
  .delete(usersController.remove);

module.exports = usersRouter;

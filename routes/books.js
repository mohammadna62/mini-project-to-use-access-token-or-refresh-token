const express = require("express");
const booksController = require("./../controllers/books");
const isAdminMiddleware = require("./../middlewares/isAdmin");

const booksRouter = express.Router();

booksRouter.use(isAdminMiddleware);

booksRouter.route("/").get(booksController.getAll);
booksRouter.route("/:id?").get(booksController.getBook);

module.exports = booksRouter;

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
require('dotenv').config()
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const authRouter = require("./routes/auth");
const path = require("path");
const viewsPath = require("./utils/viewsPath");
const cookieParser = require("cookie-parser")
const { teachersModel, teacherModel } = require("./models/teacher");
const coursesModel = require("./models/course");
const coursesRouter = require("./routes/courses");
const commentsModel = require("./models/comment");
const sessionsModel = require("./models/session");
const uploader = require("./middlewares/multer");

require("./configs/db");

const app = express(); // server
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post(
  "/",
  uploader.fields([
    {
      name: "cover",
      maxCount: 1,
    },
    {
      name: "content",
      maxCount: 2,
    },
  ]),
  async (req, res) => {
    console.log(req.files);
    return res.json(req.files);
  }
);

app.get("/about", (req, res) => {
  res.sendFile(path.join(viewsPath, "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(viewsPath, "contact.html"));
});

app.use("/api/users/", usersRouter);
app.use("/api/books/", booksRouter);
app.use("/api/courses/", coursesRouter);
app.use("/api/auth/", authRouter);

app.use((req, res, next) => {
  // return res.status(404).sendFile(path.join(viewsPath, "404.html"));

  return res.status(404).json({
    error: {
      type: "Not Found",
      message: "404 test msg",
    },
  });
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    error: {
      message: err,
    },
  });
});

app.listen(3000, () => {
  console.log(`Server Running On Port 3000`);
});

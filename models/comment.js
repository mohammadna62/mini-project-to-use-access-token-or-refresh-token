const mongoose = require("mongoose");
const { teachersSchema } = require("./teacher");

const commentsModel = mongoose.model(
  "Comment",
  new mongoose.Schema({
    body: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  })
);

module.exports = commentsModel;

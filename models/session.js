const mongoose = require("mongoose");

const sessionsModel = mongoose.model(
  "Session",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  })
);

module.exports = sessionsModel;

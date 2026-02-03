const mongoose = require("mongoose");
const { teachersSchema } = require("./teacher");

const coursesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  teacher: {
    type: teachersSchema,
  },
});

coursesSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "course",
});

coursesSchema.virtual("sessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "course",
});

const coursesModel = mongoose.model("Course", coursesSchema);

module.exports = coursesModel;

// Reference
// Embedded

// [
//   {}, {}, {}
// ]

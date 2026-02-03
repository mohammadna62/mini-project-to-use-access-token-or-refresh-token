const coursesModel = require("./../models/course");
const commentsModel = require("./../models/comment");
const sessionsModel = require("../models/session");

exports.getAll = async (req, res) => {
  const courses = await coursesModel
    .find({})
    .populate("comments")
    // .populate("teacher")
    // .populate("session")
    .select("-__v -teacher.__v");
  res.json(courses);
};

exports.getOne = async (req, res) => {
  // Codes

  const { title } = req.params;

  const course = await coursesModel
    .findOne({ title })
    .select("-__v -teacher.__v")
    .lean();

  const comments = await commentsModel
    .find({ course: course._id }, "-__v -course")
    .lean();

  const sessions = await sessionsModel
    .find({ course: course._id }, "-__v -course")
    .lean();

  res.json({
    ...course,
    comments,
    sessions,
  });
};

exports.setComment = async (req, res) => {
  const { body, courseId } = req.body;

  const comment = await commentsModel.create({
    body, // body: body
  });

  await coursesModel.findOneAndUpdate(
    { _id: courseId.toString() },
    {
      $push: {
        comments: comment._id,
      },
    }
  );

  res.json({ message: "Comment Set Successfully :))" });
};

const usersModel = require("./../models/users");
const registerValidator = require("./../Validators/register");
const { isValidObjectId } = require("mongoose");

exports.register = async (req, res) => {
  let { name, username } = req.body;

  const result = await usersModel.create({
    name,
    username,
  });

  res.status(201).json({
    message: "New user create successfully",
    result,
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id)) {
    const deletedUser = await usersModel.findByIdAndDelete({ _id: id });

    if (!deletedUser) {
      return res.status(404).json({
        message: "There is not user !!",
      });
    }
  } else {
    return res.status(422).json({
      message: "UserID is not valid !!",
    });
  }

  res.status(200).json({
    message: "User Deleted Successfully",
  });
};

exports.getAll = async (req, res) => {
  const users = await usersModel.find({}).lean();
  res.json({users});
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  let user = null;
  if (isValidObjectId(id)) {
    // user = await usersModel.findOne({ _id: id }, "-createdAt -updatedAt -_id");
    user = await usersModel
      .findOne({ _id: id })
      .select("name username email age");

    if (!user) {
      return res.status(404).json({
        message: "There is not user !!",
      });
    }
  } else {
    return res.status(422).json({
      message: "UserID is not valid !!",
    });
  }

  res.json(user);
};

const userModel = require("./../models/users")
const jwt = require("jsonwebtoken");

exports.register = async (req , res)=>{
const {username , email , password } = req.body
const result = await userModel.create({
  username ,
   password , // Hash
    email
})
res.status(201).json({message : "user created"})
}

exports.login = async (req , res)=>{
//
}

exports.signup = async (req , res)=>{
//
}
exports.refreshToken = async(req , res)=>{
//
}
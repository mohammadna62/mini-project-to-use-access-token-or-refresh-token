const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 15,
  },
  email: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});


schema.pre('save', async function(next) {
  const user = this;
  
 
  if (!user.isModified('password')) return next();
  
  try {
   
    const salt = await bcrypt.genSalt(10);
    
   
    const hashedPassword = await bcrypt.hash(user.password, salt);
    
   
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});



const model = mongoose.model("User", schema);

module.exports = model;

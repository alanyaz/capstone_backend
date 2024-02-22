const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true
  },
 
},{timestamps : true});



//  using index for better readibility
userSchema.index({ email: 1, fullName: 1 });
module.exports = mongoose.model('User', userSchema);

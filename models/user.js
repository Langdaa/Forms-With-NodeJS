const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/users");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
}, { versionKey: false });

const users = module.exports = mongoose.model('users', schema);

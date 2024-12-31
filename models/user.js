const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  taskList: [{
    task: { type: String, required: true },
    status: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false }
  }]
});

// Create a Mongoose model based on the schema
const User = mongoose.model('users', userSchema);

module.exports = User;

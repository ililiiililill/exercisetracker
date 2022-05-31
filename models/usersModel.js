const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  username: String
});

module.exports = mongoose.model('Users', usersSchema);

const mongoose = require('mongoose');

const exercisesSchema = mongoose.Schema({
  userId: { type: String, required: [true, 'userId is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  duration: { type: Number, required: [true, 'Number is required'] },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exercises', exercisesSchema);

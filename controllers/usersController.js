const expressAsyncHandler = require('express-async-handler');
const User = require('../models/usersModel');
const Exercise = require('../models/exercisesModel');

// @desc create user
// @route POST /api/users
const createUser = expressAsyncHandler(async (req, res) => {
  const userName = req.body.username;

  if (!userName) {
    throw new Error('Username is missing');
  }

  const createdUser = await User.create({ username: userName });

  res.json({
    username: createdUser.username,
    _id: createdUser._id
  });
});

// @desc get users
// @route POST /api/users
const getUsers = expressAsyncHandler(async (req, res) => {
  const userData = await User.find();
  const users = userData.map((user) => ({
    _id: user.id,
    username: user.username
  }));
  res.json(users);
});

// @desc create user's exercise
// @route POST /api/users/:_id/exercises
const createExercise = expressAsyncHandler(async (req, res) => {
  const id = req.params._id;
  const { description, duration, date } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  const exercise = await Exercise.create({
    userId: user._id,
    description: description,
    duration: duration,
    date: !date ? undefined : date
  });

  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date.toDateString(),
    _id: user.id
  });
});

// @desc get user's logs
// @route POST /api/users/:_id/logs
const getUserLogs = expressAsyncHandler(async (req, res) => {
  const id = req.params._id;
  let { from, to, limit } = req.query;

  // filters
  const filter = {
    userId: id
  };

  // filter dates
  const filterDates = {};
  if (from) {
    filterDates['$gte'] = new Date(from);
  }
  if (to) {
    filterDates['$lte'] = new Date(to);
  }
  if (from || to) {
    filter.date = filterDates;
  }

  // add limit
  if (limit) {
    limit = new Number(limit);
  }

  // get user
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  const { username, _id } = user;

  const rawLogs = await Exercise.find(filter).limit(limit);

  const logs = rawLogs.map((l) => ({
    description: l.description,
    duration: l.duration,
    date: l.date.toDateString()
  }));

  if (logs) {
    res.json({ _id, username, count: logs.length, log: logs });
  }
});

module.exports = { createUser, getUsers, createExercise, getUserLogs };

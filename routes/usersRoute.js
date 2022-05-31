const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  createExercise,
  getUserLogs
} = require('../controllers/usersController');

router.route('/').post(createUser).get(getUsers);
router.route('/:_id/exercises').post(createExercise);
router.route('/:_id/logs').get(getUserLogs);

module.exports = router;

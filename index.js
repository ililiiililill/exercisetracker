require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const { errorHandler } = require('./errorHandler');

// connect to mongoose
connectDB();
const app = express();

// req.body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// users endpoint
app.use('/api/users', require('./routes/usersRoute'));

// error handler
app.use(errorHandler);

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log('App is listening on port ' + listener.address().port);
});

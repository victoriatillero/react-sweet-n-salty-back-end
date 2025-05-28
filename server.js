const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./controllers/auth')

const snackRouter = require('./controllers/snacks.js')
const usersRouter = require('./controllers/users');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const logger = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/snacks', snackRouter);
app.use('/auth', authRouter);

app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}!`);
});

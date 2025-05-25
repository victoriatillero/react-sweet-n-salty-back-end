const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const testJwtRouter = require('./controllers/test-jwt')
const authRouter = require('./controllers/auth')
// import the controller file
const snackRouter = require('./controllers/snacks.js')
const usersRouter = require('./controllers/users');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const logger = require('morgan');
const app = express();
app.use(cors({ origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(logger('dev'));

// Routes go here
// add the snackRouter to the '/snack' route
app.use('/snacks', snackRouter);
app.use('/auth', authRouter);
app.use('/test-jwt', testJwtRouter);
app.use('/users', usersRouter);


app.listen(3000, () => {
  console.log('The express app is ready!');
});

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// import the controller file
const snackRouter = require('./controllers/snacks.js')

// const logger = require('morgan');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
// app.use(logger('dev'));

// Routes go here
// add the snackRouter to the '/snack' route
app.use('/snacks', snackRouter); 

app.listen(3000, () => {
  console.log('The express app is ready!');
});

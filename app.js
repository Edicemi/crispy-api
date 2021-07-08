require('./models/db');
require('dotenv').config();
const express = require('express');
logger = require('morgan');
const app = express();
const userRouter = require('./routes/v1/users');
const bookRouter = require('./routes/v1/books')

//middleware
app.use(logger('dev'));
app.use(express.json());


//api routes
app.use('/v1/users', userRouter);
app.use('/v1/books', bookRouter);

// home route
app.get('/', (req, res) => {
    res.render('home');
});

//server
app.listen(process.env.PORT, _ => {
    console.log(`Server running on PORT ${process.env.PORT}`);
});
if (err => {
        console.log(`Error connecting to MongoDB: ${err}`);
    });
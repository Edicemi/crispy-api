require('./models/db');
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
logger = require('morgan');
const app = express();
const userRouter = require('./routes/v1/users');
const bookRouter = require('./routes/v1/books');
const passportSetup = require('./services/passport');

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(helmet());

// set view engine
app.set('view engine', 'ejs');

//api routes
app.use('/v1/users', userRouter);
app.use('/v1/books', bookRouter);

//home route
app.get('/', (req, res) => {
    console.log('Request Sent')
    res.render('home');
    // res.send(`Welcome to Blog running on port ${ process.env.PORT }`)
});

//server
app.listen(process.env.PORT, _ => {
    console.log(`Server running on PORT ${ process.env.PORT } `);
});
if (err => {
        console.log(`Error connecting to MongoDB: ${ err }`);
    });
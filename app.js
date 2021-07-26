require('./models/db');
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
logger = require('morgan');
const app = express();
const userRouter = require('./routes/v1/users');
const profileRoute = require('./routes/v1/profile');
const bookRouter = require('./routes/v1/books');
const passportSetup = require('./services/passport');
const cookiesession = require('cookie-session');
const passport = require('passport');


//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(helmet());
app.use(cookiesession({
    maxAge: 24 * 60 * 60 * 1000, //a day
    keys: [process.env.keys]
}));


//initializepassport
app.use(passport.initialize());
app.use(passport.session());
// set view engine
app.set('view engine', 'ejs');

//api routes
app.use('/v1/users', userRouter);
app.use('/v1/books', bookRouter);
app.use('/profile', profileRoute);

//home route
app.get('/', (req, res) => {
    console.log('Request Sent')
    res.render('home', { user: req.user });
    // res.send(`Welcome to Blog running on port ${ process.env.PORT }`)
});

//server
app.listen(process.env.PORT, _ => {
    console.log(`Server running on PORT ${ process.env.PORT } `);
});
if (err => {
        console.log(`Error connecting to MongoDB: ${ err }`);
    });
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
//const session = require('express-session');
const cookieSession = require('cookie-session');
const User = require('./models/user');

require('dotenv').config();
require('./modules/auth');

// Connect to MongoDB
require('./config/services/mongoDB');

// Define routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const postsRouter = require('./routes/post');

const app = express();

// Various middleware

app.use(
  cors({
    origin: 'http://localhost:3001', // allow server to accept request from a different origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.enable('trust proxy');

// Passport middleware

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Custom middleware to check auth status
app.use((req, res, next) => {
  // Without this, user is prevented from logging in
  if (req.path.includes('/auth/')) {
    return next();
  }
  if (!req.user) return res.sendStatus(401);
  return next();
});

// Define routes

app.use('/api', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/post', postsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`${err}`);
});

module.exports = app;

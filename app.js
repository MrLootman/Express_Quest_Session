require('dotenv').config({path:'./.env'});

var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const port = process.env.APP_PORT ?? 5000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const Session = require('express-session');
const FileStore = require('session-file-store')(Session);

app.use(Session({
  store: new FileStore({
      path: path.join(__dirname, '/tmp'),
      encrypt: true
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name : 'Be bop a Lula',
  cookie: {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  secure: false,
}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/session-in', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

module.exports = app;

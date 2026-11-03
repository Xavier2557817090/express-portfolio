/* ============================================================
   File Name   : app.js
   Student's Name : 徐斌航
   StudentID   : 2024110514
   Date        : 2026-11-03
   Description : Application entry point. Configures the Express
                 app: view engine (EJS), middleware (logging,
                 parsers, static files) and mounts the site router.
   ============================================================ */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Site routes - every page of the portfolio is defined in this router
var indexRouter = require('./routes/index');

var app = express();

// ---------- View engine setup (EJS) ----------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ---------- Middleware ----------
app.use(logger('dev'));                                   // request logging
app.use(express.json());                                  // parse JSON bodies
app.use(express.urlencoded({ extended: false }));          // parse form bodies (contact form)
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));   // serve css / js / images from /public

// ---------- Routes ----------
app.use('/', indexRouter);

// ---------- 404 handler: forward to error handler ----------
app.use(function (req, res, next) {
  next(createError(404));
});

// ---------- Error handler ----------
app.use(function (err, req, res, next) {
  // set locals, only providing error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

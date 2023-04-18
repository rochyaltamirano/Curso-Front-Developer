var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var serviciosRouter = require('./routes/servicios'); //servicios.js
var contactoRouter = require('./routes/contacto'); //contacto.js
var tareaRouter = require('./routes/tarea') //tarea.hbs


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/servicios', serviciosRouter);
app.use('/contacto', contactoRouter);
app.use('/tarea', tareaRouter);

app.get('/ruta1', function (req, res){
  res.send('Hola soy la página de ruta 1')
})

app.get('/nosotros', function (req, res){
  res.render('nosotros')
})

app.get('/ruta3', function (req, res){
  res.send('Hola soy la página de ruta 3')
})

app.get('/tarea', function (req, res){
  res.render('tarea');
})

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

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routerConfig = require('./lib/routerConfig')
//var ejs = require('ejs');

var app = express();
var router = express.Router();
//设置端口
app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('develop'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//auto set routes
routerConfig(app, {
    dirPath: __dirname + '/routes/',
    map: {
        'index': '/'
    }
});

//初始化权限控制的路由
app.all('*',function(req,res,next){
    console.log('============'+req.originalUrl);
    var originalUrl = req.originalUrl;
    if(originalUrl=='/user/admin'){
        res.redirect('/');
    }else{
        next()
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'develop') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
        res.render('error', {
        message: err.message,
        error: {}
    });
});


//develep environment handler
if (app.get('env') === 'develop'){

}

app.listen(process.env.npm_package_config_port, function() {
    console.info('the run environment is '+process.env.NODE_ENV);
    console.log('Express server listening on port ' + process.env.npm_package_config_port);
});

module.exports = app;

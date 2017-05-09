//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Imports

var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = {};
var mongoose = require('mongoose');

//Create app
var app = express();

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//DB initialization
mongoose.connect('mongodb://localhost/peopnet');
var userSchema = mongoose.Schema({
    username: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    userLevel: Number
});
var userDB = mongoose.model('Users', userSchema);

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Routing

//Base url
//Send the main 'index.html' file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'routes', 'redirect.html'));
});
app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
//Login page
app.get('/login.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
//Authenticate users
app.post('/userAuth', function(req, res) {
    userDB.findOne(req.body, function(err, usr) { //Search DB
        if (usr == null) {
            res.send('NF'); //User not found. Invalid login.
        } else {
            res.send('OK'); //Valid login
            session.user = usr;
        }
    });
});
//Profile page
app.get('/my_profile.html', function(req, res) {
    console.log(session.user);
    res.sendFile(path.join(__dirname, 'views', 'my_profile.html'));
});
//Handle logout
app.get('/logout', function(req, res) {
    session = {}
    res.redirect('/');
});
//Take care of all other unhandled URls
app.get('*', function(req, res) {
    res.send('This feature is yet to be implemented or 404... [:-(]')
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Server script
//Start server on given port
var port = 8080;
var server = http.createServer(app);
app.set('port', port);
console.log("The server is listening on port " + port);
server.listen(port);
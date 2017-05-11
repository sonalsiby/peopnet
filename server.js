//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Imports

var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

//Create app
var app = express();

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'secureHashKey'}));
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


var isEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Routing

//Base url
//Go to 'redirect.html' file. 
//It redirects to index.html in public directory.
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'routes', 'redirect.html'));
});
//index.html is handled here
app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
//Login page
app.get('/login.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
//Register page
app.get('/register.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});
//Authenticate users
app.post('/userAuth', function(req, res) {
    userDB.findOne(req.body, function(err, usr) { //Search DB
        if (usr == null) {
            res.send('NF'); //User not found. Invalid login.
        } else {
            req.session.user = usr;
            res.send('OK'); //Valid login
        }
    });
});
//Check if user is present. For registration
app.post('/checkUser', function(req, res) {
    userDB.findOne(req.body, function(err, usr) {
        if (usr == null) {
            res.send('T'); //Username can be used.
        } else {
            res.send('F'); //Username already present
        }
    });
})
//Create user in DB
app.post('/registerUser', function(req, res) {
    var usr = new userDB(req.body);
    usr.save(function(err, usr) {
        if (err) throw err;
        res.send("T");
    });
})
//Profile page
app.get('/my_profile.html', function(req, res) {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'views', 'my_profile.html'));
    } else {
        res.sendFile(path.join(__dirname, 'views', 'login.html'));
    }
});
//Handle logout
app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.send('OK');
});
//To handle refreshes from the profile page
app.get('/my_profile', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//Take care of all other unhandled URls
app.get('*', function(req, res) {
    res.sendStatus(404);
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Server script
//Start server on given port
var port = 8080;
var server = http.createServer(app);
app.set('port', port);
console.log("The server is listening on port " + port);
server.listen(port);
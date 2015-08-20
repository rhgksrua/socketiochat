#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var morgan = require('morgan');
var fs = require('fs');

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');
app.use('/resources', express.static(__dirname + '/resources'));
// Loggin is available in cd $OPENSHIFT_LOG_DIR
// stdout/console.log logs to log file.
// app.use(morgan('combined', {stream: accessLogStream}));

app.enable('trust proxy');

app.get('/', function(req, res) {
    var ip = req.ip;
    //io.emit('ip', ip);
    res.render('index', {ip: ip});
});

io.on('connection', function(socket) {
    console.log('user connected');
    var ip = socket.client.request.headers['x-forwarded-for'] || 
             socket.request.connection.remoteAddress;
    socket.broadcast.emit('user connection', 'user: ' + ip);
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});

http.listen(port, ipaddress, function() {
    console.log('running... http://' + ipaddress + ":" + port);
});

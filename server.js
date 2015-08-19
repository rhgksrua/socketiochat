#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('user connected');
    io.emit('user connection', '*** user connected ***');
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});

http.listen(port, ipaddress, function() {
    console.log('running... http://' + ipaddress + ":" + port);
});

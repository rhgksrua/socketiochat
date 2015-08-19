#!/bin/env node
//  OpenShift sample Node application
var express = require('express');

var app = express();

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.get('/', function(req, res) {
    res.send('hi');
});

app.listen(port, ipaddress, function() {
    console.log('ip:   ' + ipaddress);
    console.log('port: ' + port);
});

var express = require('express');
fs = require('fs');
var dgram = require('dgram');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/socket.io-client', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    console.log('A client has connected');
});

http.listen(3000, function() {
    console.log('Listening on port 3000');
});

skt = dgram.createSocket('udp4');
skt.bind(19446);
skt.on('message', function(msg, info){
    console.log(msg.toString());
})
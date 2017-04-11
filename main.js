var express = require('express');
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

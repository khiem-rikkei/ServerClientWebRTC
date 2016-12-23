var ip = require('ip');
var cors = require('cors')
var path    = require("path");
var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function(req, res, next) { res.send('Hello world!'); });
app.get('/videochat', function(req, res) {
	res.sendFile(path.join(__dirname+'/videochat/index.html'));
})

var server = app.listen(9000);

var options = {
    debug: true
}

var peerServer = ExpressPeerServer(server, options);

peerServer.on('connection', function (id) {
  console.log('new connection with id ' + id);
});

peerServer.on('disconnect', function (id) {
  console.log('disconnect with id ' + id);
});

app.use('/api', peerServer);
app.use(express.static('videochat'));
app.use(cors());

console.log('server running on ' + ip.address());
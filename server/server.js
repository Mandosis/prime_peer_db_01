var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var assignment = require('./routes/assignment');

var app = express();

var mongoURI = 'mongodb://localhost/peer_db_assignments';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err) {
  console.log('mongodb connection error:', err);
});

MongoDB.once('open', function() {
  console.log('mongodb connection open!');
});

app.use(bodyParser.json());

app.use(express.static('server/public'));

app.use('/', index);
app.use('/assignment', assignment)

var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log('Listening on port', port);
});

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var socketIO = require('socket.io');
var mysql = require('mysql');
var cors = require('cors');
var moment = require('moment');

const ENV = require('./env');

var app = express();
var server = http.Server(app);
var io = socketIO(server);
var con = mysql.createConnection(ENV.con);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
server.listen(ENV.port, () => console.log('Starting server on port ' + ENV.port));
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/index.html')));

// Routing
require('./routes/account')(app, con);
require('./routes/class')(app, con);
require('./routes/enrollment')(app, con);
require('./routes/message')(app, con, io, moment);
require('./routes/note')(app, con, moment);
require('./routes/student')(app, con);
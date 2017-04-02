//requiring NPM modeles
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var app = express();
const http2 = require('himanshu-http2');
const fs = require('fs');
const path = require('path');

db.on('error', console.error);

//requiring local modeles
var configs = require('./config');
var routes = require('./routes/routes');
var userModel = require('./models/users');
var helperFunctions = require('./helpers/helperFunctions');
var expressHTTP2Workaround = require('express-http2-workaround');

app.use(expressHTTP2Workaround({ express:express, http2:http2 }));
// Uncomment the following lines to start logging requests to consoles.
// app.use(morgan('combined'));
// parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json.
app.use(bodyParser.json());

//connedting to mongoDB
mongoose.connect('mongodb://'+configs.dbHost+'/'+configs.dbName);
//populating data if DB is not already populated.
helperFunctions.populateDb();

//Initilizing routes.
routes(app);

// serve video files.
app.use('/videos',express.static('videos'));
// app.use('/videos/:fileName',function (req, res) {
//     var name = req.params.fileName;
//     var file = path.resolve(`${__dirname}/videos/`, name);
//     fs.stat(file, function(err, stats) {
//       if (err) {
//         if (err.code === 'ENOENT') {
//           // 404 Error if file not found
//           return res.sendStatus(404);
//         }
//       res.end(err);
//       }
//       var range = req.headers.range;
//       if (!range) {
//        // 416 Wrong range
//        return res.sendStatus(416);
//       }
//       var positions = range.replace(/bytes=/, "").split("-");
//       var start = parseInt(positions[0], 10);
//       var total = stats.size;
//       var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
//       var chunksize = (end - start) + 1;
//
//       res.writeHead(206, {
//         "Content-Range": "bytes " + start + "-" + end + "/" + total,
//         "Accept-Ranges": "bytes",
//         "Content-Length": chunksize,
//         "Content-Type": "video/mp4"
//       });
//
//       var stream = fs.createReadStream(file, { start: start, end: end })
//         .on("open", function() {
//           stream.pipe(res);
//         }).on("error", function(err) {
//           res.end(err);
//         });
//     });
// });
// serve client side code.
app.use('/',express.static('client'));
app.use('/lib/',express.static('node_modules'));
app.use('/*', express.static('client/index.html'));

var options = {
  key: fs.readFileSync('./certificates/key.pem'),
  cert: fs.readFileSync('./certificates/cert.pem')
};
//
http2.createServer(options, app).listen(configs.applicationPort, function () {
  console.log('Example app listening on port '+configs.applicationPort+'!');
});
// Finally starting the listener
// app.listen(configs.applicationPort, function () {
//   console.log('Example app listening on port '+configs.applicationPort+'!');
// });

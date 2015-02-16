var express = require('express');
var bodyParser = require('body-parser');
var dataRouter = require('./data')(express);

var app = express();

var router = express.Router();
router.get('/data', function(req, res) {
  console.log("Headers: ", req.headers, "\n\tURL: ", req.url, "\n\tMethod: ", req.method, "\n\tParams: ", req.params, "\n\tQuery: ", req.query);
  res.send({type: 300, message: "Test Stuff"});
});

router.post('/data/:name', function(req, res) {
  console.log(req.method, req.url, "\nParams: ", req.params, "\nQuery: ", req.query, "\nBody: ", req.body, "\nHeaders: ", req.headers, "\n\n");
  res.send(req.body);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../dist'));
app.use('/subdata', dataRouter);
app.use('/', router);

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

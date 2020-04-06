var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('dist'));

app.use('/', require('./router/main'));
server.listen(3000, function() {
  console.log('server is runing in port 3000')
})
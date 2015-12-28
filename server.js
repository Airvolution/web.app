var proxy = require('express-http-proxy');
var express = require('express');
var app = express();

app.use('/api',proxy('http://localhost:2307',{
    forwardPath: function(req, res){
        return require('url').parse(req.url).path;
    }
}));

app.use(express.static('build'));

var server = app.listen(8084, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
var proxy = require('express-http-proxy');
var express = require('express');
var app = express();
var url = require('url');

var apiDest = 'localhost:2307';
var searchDest = apiDest;
app.use('/api',proxy(apiDest,{
    forwardPath: function(req, res){
        return '/'+url.parse(req.url).path;
    }
}));
app.use('/search',proxy(searchDest,{
    forwardPath: function(req,res){
      return '/'+url.parse(req.url).path;
    }
}));

app.use(express.static(__dirname));

var server = app.listen(8084, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('AirU app listening at http://%s:%s', host, port);
    console.log('Proxying API to %s and Search to %s', apiDest, searchDest);
});
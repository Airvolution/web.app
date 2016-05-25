var proxy = require('express-http-proxy');
var express = require('express');
var app = express();
var url = require('url');

//var apiDest = 'localhost:2307';
///var apiDest = 'localhost:2307';
var apiDest = 'dev.air.eng.utah.edu';
var searchDest = 'dev.air.eng.utah.edu';
app.use('/api',proxy(apiDest,{
    forwardPath: function(req, res){
        var forward = '/api'+url.parse(req.url).path;
        console.log('Proxying to %s',apiDest+forward);
        return forward;
    }
}));
app.use('/search',proxy(searchDest,{
    forwardPath: function(req,res){
        var forward = '/search'+url.parse(req.url).path;
        console.log('Proxying to %s',searchDest+forward);
        return forward;
    }
}));

app.use(express.static(__dirname));

var server = app.listen(8084, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('AirU app listening at http://%s:%s', host, port);
    console.log('Proxying API to %s and Search to %s', apiDest, searchDest);
});
var compression = require('compression');
var express = require('express');
var app = express();
app.use(compression())
app.use(express.static(__dirname + '/'));
app.listen(4200, function() {
    console.log('Express server listening on port ' + 4200);
});
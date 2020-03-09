var express = require('express');
var mustache = require('mustache-express'),
    path = require('path');

var app = express();



//DB Stuff

var DAO = require('./Model/nedb');
var dbFile = 'database.nedb.db';
let dao = new DAO(dbFile);
dao.init();


app.set('port', process.env.PORT || 5001);

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname, 'mustache'));

app.get("/", function(request, response) {
    response.status(200);
    response.type('text/html');
    response.send('<h1>Landing Page</h1>');
});

app.get("/guests", function(request, response) {
    response.render("entries", {
        "entries": list
    });
});

app.get("/", function(request, response) {
    dao.all()
        .then((list) => {
            console.log(list);
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        });
});


app.use(function(request, response) {
    response.type('text/plain');
    response.status(404);
    response.send("Bad luck, 404");
});

app.listen(app.get('port'), function() {
    console.log('server running');
});
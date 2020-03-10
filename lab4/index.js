var express = require('express');
var mustache = require('mustache-express'),
    path = require('path');

var app = express();



//DB Stuff

var DAO = require('./Model/nedb.js');
var dbFile = 'database.nedb.db';
let dao = new DAO(dbFile);
var dbFilePath = "./Model/database.nedb.db";
var List;
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

app.get("/guestbook", function(request, response) {
    dao.all()
        .then((list) => {
            console.log("list content:");
            console.log(list);
            List = list;
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        });
    response.render("guestbook", {
        'title': 'New Guest Book',
        'subject': 'Good day out',
        'review': 'We had a really good time visiting the museum.',
        'visitors': [
            { 'name': 'Peter' },
            { 'name': 'Adam' },
            { 'name': 'Bella' }
        ],
        "entries": [
            { 'comment': List[0].comment },
            { 'subject': List[0].subject },
            { 'content': List[0].content },
            { 'review': List[0].review },
        ]
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
var http = require('http');

http.createServer(function(req, res) {
    // the replace function removes any query strings and slashes
    // the toLowerCase functions makes it lower case 
    path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
            res.writeHead(200, { 'Content-Type': 'html' });
            res.end("<h1> Welcome to the HomePage </h1>");
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'html' });
            res.end('<h2>This is the about page</h2>');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'html' });
            res.end('<h3>This is an error page</h3>');
            break;
    }
}).listen(8000);

console.log('Server started on localhost:8000; press Ctrl-C to terminate....');
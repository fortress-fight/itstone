const HTTP = require('http');

HTTP.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    setTimeout(() => {
        res.end('Hello <b>World</b>');
    }, 1000);
}).listen(3000);
const HTTP = require('http');

HTTP.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hellow World');
}).listen(3000);
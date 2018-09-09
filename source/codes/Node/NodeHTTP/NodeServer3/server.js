const HTTP = require('http');
const QS = require('querystring');

HTTP.createServer((req, res) => {
    var body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        res.writeHead(200);
        res.end('Done');
        console.log('\n got name \033[90m' + QS.parse(body).name + '\033[39m\n');
    });
}).listen(3000);
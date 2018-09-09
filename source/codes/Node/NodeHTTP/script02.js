const HTTP = require('http');

HTTP.createServer((req, res) => {
    console.log(req.headers);
    res.writeHead(200, {
        "Content-Type": "image/png"
    });
    let stream = require('fs').createReadStream('./image.jpg');

    stream.on('data', (data) => {
        res.write(data);
    });

    stream.on('end', () => {
        res.end();
    });
}).listen(3000);
const HTTP = require('http');
const QS = require('querystring');

HTTP.createServer((req, res) => {
    if (req.url == '/') {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end([
            '<form method="POST" action="/url">',
            "<h1>My Form</h1>",
            "<fieldset>",
            "<label>Personal information</label>",
            "<p>what is your name:</p>",
            "<input name='name' type='text'>",
            "<p><button>Submit</button></p>",
            "</form>"
        ].join(''));
    } else if (req.url == '/url' && req.method == "POST") {
        var body = "";
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            console.log(QS.parse(body));
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.write('You sent a <em>' + req.method + '</em> request');
            res.end('<p> Content-Type:' + req.headers['content-type'] + '</p>' + '<p>Data:</p><pre>' + 'your name is' + QS.parse(body).name + '</pre>');
        });
    } else {
        res.writeHead(404);
        res.end('<NOT FOND>');
    }
}).listen(3000);
// require("http")
//     .createServer(function (req, res) {
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         });
//         res.end("<h1>Hello World</h1>");
//     })
//     .listen(3000);

// leason1

// const net = require('net');

// let server = net.createServer(con => {
//     console.log("\033[90m new connection! \033[39m");
// });

// server.listen(3000, function () {
//     console.log("\033[96m server listening on *:3000\033[39m");
// });


// leason2


const net = require("net");

let count = 0;

let server = net.createServer(con => {
    console.log('\033[90m new connection! \033[39m');

    con.write('\n > welcome to \033[92m node-chat\033[39m! \n > ' + count + ' other people are connected at this time Please write your name and press enter:');

    con.on('close', () => {
        count--;
    });
    count++;
});

server.listen(3000, () => {
    console.log("\033[96m server listening on *:3000\033[39m");
});
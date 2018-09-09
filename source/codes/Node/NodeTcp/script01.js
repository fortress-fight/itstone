const net = require('net');
let count = 0;
let server = net.createServer(con => {
    console.log('\033[90m new connection!\033[39m');

    con.write("\n > welcome to \033[92m node-chat \033[39m! \n > " + count + "other people are connected at this time \n > please write your name and press enter");

    con.on("close", () => {
        count--;
    });

    con.on("data", data => {
        console.log(data.toString('utf8'));
    });
    count++;
});

server.listen(3000, () => {
    console.log("\033[96m server listening on *:3000\033[39m");
});
const net = require('net');
let count = 0,
    users = {};

let server = net.createServer(con => {
    console.log('\033[90m new connection!\033[39m');

    con.setEncoding('utf8');

    let nickname;

    con.write("\n > welcome to \033[92m node-chat \033[39m! \n > " + count + "other people are connected at this time \n > please write your name and press enter");

    con.on("close", () => {
        count--;
        delete users[nickname];
    });

    con.on("data", data => {

        data = data.replace('\r\n', "");
        console.log(data, 'nickname ' + nickname);

        if (!nickname) {
            if (users[data]) {
                con.write("\033[93m> nickname already in use, try again: \033[39m");

                nickname = '';
            } else {

                nickname = data;
                users[nickname] = con;

                for (const i in users) {
                    if (users.hasOwnProperty(i)) {
                        console.log('加入的人有：',
                            i);
                        const e = users[i];

                        e.write("\033[90m > " + nickname + "joined the room \033[39m\n");
                    }
                }
            }
            return;
        } else {
            for (const i in users) {
                if (users.hasOwnProperty(i) && i != nickname) {
                    const v = users[i];
                    v.write('\033[96m > ' + nickname + ':\033[39m' + data + '\n');
                }
            }
        }
    });
    count++;
});

server.listen(3000, () => {
    console.log("\033[96m server listening on *:3000\033[39m");
});
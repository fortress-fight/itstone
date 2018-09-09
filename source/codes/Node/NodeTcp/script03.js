const net = require('net');

function broadcast(users, name, msg, exceptMyself) {
    for (const i in users) {
        if (users.hasOwnProperty(i)) {
            if (!exceptMyself || i != name) {
                const con = users[i];
                con.write(msg);
            }
        }
    }
}

let count = 0,
    users = {};

let server = net.createServer(con => {
    console.log('\033[90m new connection! \033[39m');

    con.setEncoding('utf8');

    let nickname;

    con.write('\n > welcome to \033[92m node-chat\033[39m! \n> ' + count + ' other people are connected at this time \n > please write your name and press enter:');

    con.on('close', () => {
        count--;
        delete users[nickname];
    });

    con.on('data', data => {
        data.replace('\r\n', '');

        console.log(data);

        if (!nickname) {
            if (users[data]) {
                con.write('\033[93m > nickname already in uses. try again: \033[39m ');
                return;
            } else {
                nickname = data;
                users[nickname] = con;

                broadcast(users, nickname, '\033[90m > ' + nickname + ' joined the room \033[39m \n');
            }
        } else {
            broadcast(users, nickname, '\033[96m > ' + nickname + ':\033[39m' + data + '\n', true);
        }
    });

    count++;
});

server.listen(3000, () => {
    console.log('\033[96m server listenning on *:3000 \033[39m');
});
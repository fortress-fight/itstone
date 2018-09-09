const HTTP = require('http');
const QS = require('querystring');

let send = theName => {
    HTTP.request({
        host: '127.0.0.1',
        url: '/',
        port: 3000,
        method: 'POST',
    }, res => {

        res.setEncoding('utf8');
        // 如果没有监听 `data` 事件 `end` 事件就不会执行
        res.on('data', () => {});
        res.on('end', () => {
            console.log('\n \033[90m request complete!\033[39m');
            process.stdout.write('\n your name:');
        });
    }).end(QS.stringify({
        name: theName
    }));
};

process.stdout.write('\n your name: ');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', name => {
    send(name.replace('\n', ''));
});
const fs = require('fs');
fs.readFile(__dirname + '/test.txt', function (err, contents) {
    if (err) {
        throw err;
    }

    console.log(contents.toString());
});

console.log('hi');

// 1
let promise = new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/test.txt', (err, contents) => {
        if (err) {
            reject(err);
        }
        resolve(contents)
    })
});

promise.then(function (contents) {
    console.log(contents.toString())
}, (err) => {
    console.log(err)
});
// 等价于
promise.then(function (contents) {
    console.log(contents.toString())
}).catch((err) => {
    console.log(err)
})

// 2
promise = new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/test.txt', (err, contents) => {
        if (err) {
            reject(err);
        }
        resolve(contents);
    })
});

promise.then(function (contents) {
    console.log(contents.toString());
    promise.then(function (contents) {
        console.log(contents.toString())
    })
})

// 3
function readFile(filename) {
    return new Promise((resolve, reject) => {
        console.log('running');
        fs.readFile(filename, {
            encoding: 'utf-8'
        }, (err, contents) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(contents);
        })
    })
}

promise = readFile(__dirname + '/test.txt');

promise.then((contents) => {
    console.log(contents)
}, (err) => {
    throw err
})

// 3
promise = new Promise((resolve, reject) => {
    console.log('Promise');
    resolve()
});

promise.then(() => {
    console.log('Resolved')
});

console.log('hi')
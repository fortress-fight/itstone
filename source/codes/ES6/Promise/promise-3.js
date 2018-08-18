import fs from 'fs';

function run(taskDef) {
    let task = taskDef();

    let result = task.next();

    (function step() {
        if (!result.done) {
            let promise = Promise.resolve(result.value);

            promise.then(value => {
                result = task.next(value);
                step();
            }).catch(error => {
                result = task.throw(error);
                step();
            })
        }
    })();
}

function readFile(filename) {
    return new Promise((res, rej) => {
        fs.readFile(filename, 'utf-8', (err, con) => {
            if (err) {
                rej(err);
            } else {
                res(con);
            }
        })
    })
}

run(function* () {
    let con = yield readFile(__dirname + '/test.txt');
    console.log(con)
})

async function getPromise(param) {
    return 'answer' + param;
}

let promise1 = getPromise('is not good');
promise1.then(res => {
    console.log(res)
})

async function getFile(filename) {
    let con = await getFileContent(filename);
    console.log(con); // this is a file
}

function getFileContent(filename) {
    return new Promise((res, rej) => {
        fs.readFile(filename, 'utf-8', (err, con) => {
            if (err) {
                rej(err);
                return;
            }
            res(con);
        });
    })
}
getFile(__dirname + '/test.txt');
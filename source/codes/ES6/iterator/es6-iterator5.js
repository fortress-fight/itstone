import fs from 'fs';

function run(taskDef) {
    let task = taskDef();

    let result = task.next();

    function step() {
        if (!result.done) {
            if (typeof result.value === 'function') {
                result.value(function (err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }

                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }
        }
    }
    step();
}

function readFile(fileName) {
    return function (cal) {
        fs.readFile(fileName, 'utf-8', cal)
    }
}

run(function* () {
    let c = yield readFile(__dirname + "/es6-iterator4.js");
    console.log(c);
})
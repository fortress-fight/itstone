let promise = Promise.resolve('已知条件');

promise.then((prom) => {
    console.log(prom)
})

console.log('Hi');

/**
 * 输出：
 * Hi
 * 已知条件
 */

promise = Promise.reject('已经拒绝');

promise.catch((error) => {
    console.log(error)
});

let thenable = {
    then(resolve, reject) {
        resolve('已解决')
    }
}

let p1 = Promise.resolve(thenable);

p1.then((val) => {
    console.log(val)
})

promise = new Promise(function (resolve, reject) {
    throw new Error('explosion')
})

promise.catch((error) => {
    console.log(error)
})

// 等价于

promise = new Promise(function (res, rej) {
    try {
        throw new Error('Explosion!')
    } catch (ex) {
        rej(ex)
    }
})

promise.catch((error) => {
    console.log(error)
})
promise = new Promise(function (resolve, reject) {
    throw new Error('explosion')
})

promise.catch((error) => {
    console.log(error)
})

// 等价于

promise = new Promise(function (res, rej) {
    try {
        throw new Error('Explosion!')
    } catch (ex) {
        rej(ex)
    }
})

promise.catch((error) => {
    console.log(error)
})
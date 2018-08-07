let p1 = new Promise((resolve, reject) => {
    resolve('success')
});

p1.then((content) => {
    console.log(content)
}).then((content) => {
    console.log(content); // undefined
    console.log('Finished');
});

let p2 = new Promise((resolve, reject) => {
    resolve('right')
});

p2.then(() => {
    throw new Error('this is a error')
}).catch((err) => {
    console.log(err)
})

let p3 = new Promise((resolve, reject) => {
    resolve('right')
});

p3.then((infor) => {
    console.log(infor);
    return 'Infor is ' + infor
}).then((secInfor) => {
    console.log(secInfor) // Infor is right
})

let p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});
let p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
})
let p6 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    }, 3000);
})

let p7 = Promise.all([p4, p5, p6]);
console.log(new Date);

p7.then((content) => {
    console.log(content);
    console.log(new Date);
})


let p8 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});
let p9 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 500);
})
let p10 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    }, 3000);
})

let p11 = Promise.race([p8, p9, p10]);
console.log(new Date);

p11.then((content) => {
    console.log(content);
    console.log(new Date);
})
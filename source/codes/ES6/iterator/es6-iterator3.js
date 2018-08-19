function* createIterator() {
    console.log('start');
    let first = yield 1;
    yield first + 2;
}

let iterator = createIterator();

// 正常
// console.log(iterator.next()) //​ ​​​​{ value: 1, done: false }​​​​​
// console.log(iterator.next()) // ​​​​​{ value: NaN, done: false }​​​​​

console.log(iterator.next()); //​​​​​ { value: 1, done: false }​​​​​
console.log(iterator.next(10)); //​​​​​ { value: 12, done: false }​​​​​

function* createIterator2() {
    let first = yield 1;

    let second;

    try {
        second = yield first + 2;
    } catch (ex) {
        second = 10
    }
    yield second + 10
}

let iterator2 = createIterator2();

// console.log(iterator2.next());
// console.log(iterator2.next(2));
// console.log(iterator2.next(3));
// console.log(iterator2.next());

console.log(iterator2.next());
console.log(iterator2.next(2));
console.log(iterator2.throw(new Error('isError')))
console.log(iterator2.next())

function* createIterator3() {
    yield 'first';
    return 'result';
    yield 'second';
}
iterator3 = createIterator3();

console.log(iterator3.next())
console.log(iterator3.next()); // ​​​​​{ value: 'result', done: true }​​​​​
console.log(iterator3.next())

for (const v of createIterator3()) {
    console.log(v)
}
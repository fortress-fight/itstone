function createIterator(items) {
    let i = 0;
    return {
        next: function () {
            let done = (i >= items.length),
                value = !done ? items[i++] : undefined;

            return {
                done,
                value
            }
        }
    }
};

var iterator = createIterator([1, 2, 3, 4]);

// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
function* createIterator2() {

    yield 1;
    yield 2;
}

var i2 = createIterator2();

console.log(i2.next())
console.log(i2.next())
console.log(i2.next())

function* createIterator3(items) {
    for (var i = 0, len = items.length; i < len; i++) {
        yield items[i]
    }
};

var i3 = createIterator3([1, 2, 3]);

console.log(i3.next());
console.log(i3.next());
console.log(i3.next());
console.log(i3.next());

let val = [1, 2, 3];
let i4 = val[Symbol.iterator]();
console.log(i4.next())
console.log(i4.next())
console.log(i4.next())

function isIterator(obj) {
    return typeof obj[Symbol.iterator] == 'function'
}

console.log(isIterator([]))

let collection = {
    items: [],
    * [Symbol.iterator]() {
        for (let item of this.items) {
            yield item + '：迭代';
        }
    }
}

collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let x of collection) {
    console.log(x)
}

// 1：迭代
// 2：迭代
// 3：迭代
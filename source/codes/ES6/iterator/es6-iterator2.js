let ages = [10, 9, 12, 14];

let iterator = ages.keys()
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

let color = ['red', 'blue', 'origin'];
for (const v of color.keys()) {
    console.log(v)
}

let data = new Map();

data.set('title', 'ES6');
data.set('formate', 'ebook');

for (const [key, val] of data) {
    console.log(key, val) // title ES6 , formate ebook
}

let arr = [12, 3, 4, 5];
console.log([...arr]);

let set = new Set([2, 3, 4]);
console.log([...set]);

let map = new Map([
    ['name', 'ff'],
    ['age', '24']
]);

console.log([...map])

let map2 = map.keys();
console.log(map2);
console.log([...map2])

console.log([...arr, ...map])

let obj = {
    name: 'ff',
    age: 24
};
console.log(Object.entries(obj))
for (const arr of Object.entries(obj)) {
    console.log(arr)
}
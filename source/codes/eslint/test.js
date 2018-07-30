var obj = {
    name: 1
};
var obj2 = {
    name: 2
};

obj, obj2;

function a(o) {}

for (let index = 0; index < 1000; index++) {
    const e = 1000;
    a(e)
}
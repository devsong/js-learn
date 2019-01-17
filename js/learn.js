a = 1;
console.log(window.a);
var newW = window.open('http://www.baidu.com');
setInterval(() => {
    if (newW.closed) {
        console.log('closed');
    } else {
        console.log('not closed');
    }
}, 3000);

console.log(frames.length);
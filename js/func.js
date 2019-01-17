function fib(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return fib(n - 2) + fib(n - 1);
}

function arg(a, b, c) {
  console.log(arguments.length);
  console.log(a + '' + b + c);
}

function closureFunc() {
  var i = 0;

  function innerFunc() {
    console.log(i++);
  }
  return innerFunc;
}

// console.log(fib(5))
// arg(undefined, 1, 2);
// var f = closureFunc();
// f();
// f();
eval('var a = 1;');
console.log(a);
function fib(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return fib(n - 2) + fib(n - 1);
}

function arg(a, b, c) {
  console.log(a + '' + b + c);
}

// console.log(fib(5))
arg(undefined, 1, 2);
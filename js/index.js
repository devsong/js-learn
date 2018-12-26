var obj = {
  name: 'gzs',
  age: 11,
  gender: 0,
};

function testObjectLoop0 () {
  for (k in Object.getOwnPropertyNames (obj)) {
    console.log (k);
  }
  console.log (alert.toString ());
  console.log ('fib:' + fib (6));
}

function testObjectLoop1 () {
  for (var k in Object.keys (obj)) {
    alert (k);
  }
}

function fib (n) {
  if (n === 1 || n === 0) {
    return n;
  } else {
    return fib (n - 2) + fib (n - 1);
  }
}

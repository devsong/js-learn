function fib(n) {
    if (n === 0 || n === 1) {
        return n
    }
    return fib(n - 2) + fib(n - 1)
}

console.log(fib(5))
function testObject () {
  var obj = {name: 'gzs',age: 11,gender: 0}
  for (k in Object.getOwnPropertyNames(obj)) {
    console.log(eval('obj.' + k))
  }
}

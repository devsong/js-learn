var obj = {};
console.log(obj);
obj.toString = function () {
  return 'obj'
};
console.log(obj + ' ');

function DOG(name) {
  this.name = name;
}

DOG.prototype = {
  spec: '犬科',
  toString: function () {
    return this.spec;
  }
}
var dog1 = new DOG('大毛');
var dog2 = new DOG('二毛');
console.log(dog1.spec + '');
console.log(dog2.spec + '');
console.log(dog2 + '');
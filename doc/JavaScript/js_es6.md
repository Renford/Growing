ES6 声明变量的六种方法：const(常量)、let(局部变量)、var()、function(方法)、class(类)、import

1、let 和 var

```
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```

let 的暂时性死区：只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

```
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

var 变量的全局泄露

```
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

2、变量的解构赋值
解构赋值允许指定默认值

数组

```
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

对象

```
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

字符串

```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

函数参数

```
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

=> 等价于 function

```
(x) => x + 6

// 等价于
function(x){
    return x + 6;
}
```

## Symbol

1、ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。解决属性名冲突的问题。可以转换成 String、Boolean，但不能转换成 number

```
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false
```

2、单例

```
const FOO_KEY = Symbol.for('foo');

function A() {
  this.foo = 'hello';
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];
```

3、内置的 Symbol 值

- Symbol.hasInstance 对象的 instanceof 就是通过这个实现的
- Symbol.isConcatSpreadable 等于一个布尔值，表示该对象用于 Array.prototype.concat()时，是否可以展开
- Symbol.species 指向一个构造函数。创建衍生对象时，会使用该属性。
- Symbol.match 等价于 String.prototype.math

JavaScript 的服务器运行环境：node
ES6 的转码器：Babel，可以将 ES6 代码转为 ES5 代码

## this && that

1. 全局

- 严格模式：在作用于顶部添加 'use strict'，this 指向 undefined
- 非严格模式：this 指向 global object

```
function nonStrict() {
  // 非严格模式
  console.log(this); // window
}

function strict() {
  'use strict';
  // 严格模式
  console.log(this); // undefined
}
```

2. Eval 函数

Eval 函数中，this 指向就是当前作用域的对象。

```
var name = 'aaa';
var person = {
    name: 'bbb',
    getName: function(){
        eval("console.log(this.name)");
    }
}
person.getName();  // bbb

var getName=person.getName;
getName();  // aaa
```

3. 对象的方法中，如果直接提取方法并调用，会丢失 this 对象

```
var counter = {
  count: 0,
  inc: function() {
    this.count ++;
  }
}

var func = counter.inc;
func();
counter.count;   // 输出0，会发现func函数根本不起作用
```

虽然把 counter.inc 函数提取出来了，但是函数里面的 this 变成了全局对象了，所以 func() 函数执行的结果是 window.count++。然而 window.count 根本不存在，且值是 undefined，对 undefined 操作，得到的结果只能是 NaN。

可以使用 bind 函数解决这种问题

```
var func2 = counter.inc.bind(counter);
func2();
counter.count; // 输出是1，函数生效了！
```

4. 内部函数和匿名函数里面的 this 都是指向外面的 window

```
var context = "global";

var test = {
  context: "inside",
  method: function () {
    console.log(this + ":" +this.context);

    function f() {
        var context = "function";
        console.log(this + ":" +this.context);
    };
    f();

    (function(){
        var context = "function";
        console.log(this + ":" +this.context);
    })();
  }
};

test.method();

// [object Object]:object
// [object Window]:global
// [object Window]:global
```

5. setTimeout、setInterval 中的 this

setTimeout/setInterval 执行的时候，this 默认指向 window 对象，除非手动改变 this 的指向。

```
var name = 'aaa';
function Person(){
    this.name = 'YDZ';
    this.sayName=function(){
    	console.log(this); // window
        console.log(this.name); // aaa
        };
    setTimeout(this.sayName, 10);
    }
var person=new Person();
```

6. call() / apply() / bind()

- call：通过调用方法的形式来间接调用函数，立即执行函数
- apply：同 call，通过调用方法的形式来间接调用函数，立即执行函数
- bind：将某个函数绑定到某个对象上，返回了一个新的函数

```
var obj = {};
function foo(a, b, c) {
  console.log(b);
}
foo.call(obj, 1, 2, 3)   // 2

var obj = {};
function foo(a, b, c) {
  console.log(b);
}
foo.apply(obj, [1, 2, 3])   // 2
```

```
var rabbit = { name: 'White Rabbit' };
function concatName(string) {
  console.log(this === rabbit); // => true
  return string + this.name;
}
// 间接调用
concatName.call(rabbit, 'Hello ');  // => 'Hello White Rabbit'
concatName.apply(rabbit, ['Bye ']); // => 'Bye White Rabbit'
```

7. 箭头函数

```
var numbers = [1, 2];
(function() {
  var get = () => {
    console.log(this === numbers); // => true
    return this;
  };
  console.log(this === numbers); // => true
  get(); // => [1, 2]
  // 箭头函数使用 .apply() 和 .call()
  get.call([0]);  // => [1, 2]
  get.apply([0]); // => [1, 2]
  // Bind
  get.bind([0])(); // => [1, 2]
}).call(numbers);
```

参考：

- [ES6 入门](http://es6.ruanyifeng.com)
- [npm script 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

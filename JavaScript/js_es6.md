ES6声明变量的六种方法：const(常量)、let(局部变量)、var()、function(方法)、class(类)、import

1、let和var

```
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```

let的暂时性死区：只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
```
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}

```

var变量的全局泄露

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

=> 等价于function
```
(x) => x + 6

// 等价于
function(x){
    return x + 6;
}
```


JavaScript的服务器运行环境：node
ES6的转码器：Babel，可以将 ES6 代码转为 ES5 代码

参考：

[ES6入门](http://es6.ruanyifeng.com)
[npm script使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

1、优先使用解构赋值

2、变量使用 let 代替 var，常亮优先使用 const

3、对象添加新属性，尽量使用 Object.assign
4、使用扩展运算符（...）拷贝数组。

```
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

5、立即执行函数尽量使用`=>`

```
// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params);
```

6、用 Class 取代需要 prototype，用 extends 取代 instanceof 实现继承

```
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}
```

7、标准化 js 模块写法：使用 import 取代 require，使用 export 取代 module.exports。如果模块默认输出一个函数，函数名的首字母应该小写，如果模块默认输出一个对象，对象名的首字母应该大写。

```
// commonJS的写法
var React = require('react');

var Breadcrumbs = React.createClass({
  render() {
    return <nav />;
  }
});

module.exports = Breadcrumbs;

// ES6的写法
import React from 'react';

class Breadcrumbs extends React.Component {
  render() {
    return <nav />;
  }
};

export default Breadcrumbs;
```

8、使用 ESLint 检查语法规则和代码风格

9、注意 Class 定义共有方法、私有方法、静态方法，静态方法不会被实例继承，但父类的静态方法，可以被子类继承

```
class Widget {
  // 共有方法
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

// 私有方法
function bar(baz) {
  return this.snaf = baz;
}


class Foo {
  // 静态方法
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

10、Class 的静态属性和实例属性

```
// 静态
class Foo {
}

Foo.prop = 1;
Foo.prop // 1

// 实例
class MyClass {
  myProp = 42;

  constructor() {
    console.log(this.myProp); // 42
  }
}
```

11、何时用 === ，何时用 ==

除判空使用`==`，其他都是用 `===`

```
if ( obj == null ) {
  // 上面这个判断相当于 obj.a === null || obj.a === undefined
  // 上面这种简写方式 jQuery 中推荐的写法
}
```

12、数据精度处理

- NaN： not a number，但是 typeof NaN == number
- Infinity： 无穷大

```
0.1 + 0.2 ;  // 0.300000000000004

( 0.1 + 0.2 ) + 0.3;    // 0.6000000000001
0.1 + ( 0.2 + 0.3 );    // 0.6

(0.8+0.7+0.6+0.5) / 4   // 0.65
(0.6+0.7+0.8+0.5) / 4   // 0.6499999999999999
```

13、数组操作

- delete：删除元素会删出空格，但是不会改变数组的长度
- splice：正常删除

```
var array = [1,2,3,4]
delete array[1] // [1, ,3,4]
array.splice(1) // [2,3,4]
```

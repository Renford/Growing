1、优先使用解构赋值

2、变量使用let代替var，常亮优先使用const

3、对象添加新属性，尽量使用Object.assign
	
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

7、标准化js模块写法：使用import取代require，使用export取代module.exports。如果模块默认输出一个函数，函数名的首字母应该小写，如果模块默认输出一个对象，对象名的首字母应该大写。

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

8、使用ESLint检查语法规则和代码风格

9、注意Class定义共有方法、私有方法、静态方法，静态方法不会被实例继承，但父类的静态方法，可以被子类继承
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


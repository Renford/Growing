1、CommonJS规范

在这个规范下，每个.js文件都是一个模块，它们内部各自使用的变量名和函数名都互不冲突，例如，hello.js和main.js都申明了全局变量var s = 'xxx'，但互不影响
一个模块想要对外暴露变量（函数也是变量），可以用module.exports = variable;，一个模块要引用其他模块暴露的变量，用var ref = require('module_name');就拿到了引用模块的变量。

实现原理

```
var s = 'Hello';
var name = 'world';

console.log(s + ' ' + name + '!');
```

node.js加载后变成这样

```
(function () {
    // 读取的hello.js代码:
    var s = 'Hello';
    var name = 'world';

    console.log(s + ' ' + name + '!');
    // hello.js代码结束
})();
```

module.exports的实现原理

```
// 准备module对象:
var module = {
    id: 'hello',
    exports: {}
};
var load = function (module) {
    // 读取的hello.js代码:
    function greet(name) {
        console.log('Hello, ' + name + '!');
    }

    module.exports = greet;
    // hello.js代码结束
    return module.exports;
};
var exported = load(module);
// 保存module:
save(module, exported);
```

2、node.js的基本模块

+ fs 文件系统模块，负责读写文件，支持同步、异步
+ stream 流数据读写模块，仅可在服务器运行，
+ http Web服务器模块，提供request和response对象
+ crypto 加密模块，提供md5、aes、sha1

3、常用模块

+ mysql：数据库mysql驱动模块
+ sequelize：orm模块，直接操作mysql，[Sequelize官方文档](http://docs.sequelizejs.com)
+ lodash：专门处理数据转换、查找、匹配的模块，[lodash官方文档](https://lodash.com)

4、koa

koa是Express团队开发的一个基于Node.js的web框架，目前有1.0和2.0两个版本。

+ Express 基于ES5语法，实现异步麻烦，只能回调
+ koa 1.0 基于ES6语法，使用generator实现异步，代码看起来像是同步操作
+ koa 2.0 基于ES7语法，使用Promise+async/await关键字实现异步，大势所趋

__只要API返回Promise，就可以用await调用__

```
// Express异步风格
app.get('/test', function (req, res) {
    fs.readFile('/file1', function (err, data) {
        if (err) {
            res.status(500).send('read file1 error');
        }
        fs.readFile('/file2', function (err, data) {
            if (err) {
                res.status(500).send('read file2 error');
            }
            res.type('text/plain');
            res.send(data);
        });
    });
});

// koa 1.0 异步风格
var koa = require('koa');
var app = koa();

app.use('/test', function *() {
    yield doReadFile1();
    var data = yield doReadFile2();
    this.body = data;
});

app.listen(3000);

// koa 2.0 异步风格
app.use(async (ctx, next) => {
    await next();
    var data = await doReadFile();
    ctx.response.type = 'text/plain';
    ctx.response.body = data;
});

```

koa 常用包

+ koa-router：路由、处理请求url，提供router.get、router.post方法
+ koa-bodyparser：body解析
+ koa-logger：格式化log

5、REST API

6、mocha测试

7、后端的mvc、前端的mvvm


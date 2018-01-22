1、javascript模块化

ES6之前: CommonJS、AMD、CMD
ES6之后: module(export+import)

[javascript中的require、import与export](http://www.jb51.net/article/124442.htm)

2、node.js的基本模块

+ fs 文件系统模块，负责读写文件，支持同步、异步
+ stream 流数据读写模块，仅可在服务器运行，
+ http Web服务器模块，提供request和response对象
+ crypto 加密模块，提供md5、aes、sha1

3、常用模块

+ mysql：数据库mysql驱动模块
+ sequelize：orm模块，直接操作mysql，[Sequelize官方文档](http://docs.sequelizejs.com), [中文文档](https://github.com/demopark/sequelize-docs-Zh-CN)
+ lodash：专门处理数据转换、查找、匹配的模块，[lodash官方文档](https://lodash.com)
+ nunjucks: 数据模板引擎，[nunjucks官方文档](http://mozilla.github.io/nunjucks/)
+ node-uuid: 生成唯一标识码，可基于时间、随机数，[node-uuid官方文档](https://www.npmjs.com/package/node-uuid)
+ nodemon：启动服务器之后，修改文件自动重启服务，[nodemon官方文档](https://github.com/remy/nodemon)

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


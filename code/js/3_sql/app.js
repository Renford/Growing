const Koa = require('Koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('./routes');
const response = require('./middlewares/response');

const app = new Koa();

// 格式化请求log
app.use(logger());

// 格式化输出+错误处理
app.use(response);
// body解析，必须写在router被注册到app之前
app.use(bodyParser());
// add routers
app.use(router.routes());


app.listen(3000);
console.log('app started at port 3000');


// todo 
// ==1、连接mysql、数据存储
// 2、错误处理
// 3、格式化输出、输出关键log
// 4、模块化使用es6规范
// 5、自动生成rest 文档
// 6、mocha测试模块

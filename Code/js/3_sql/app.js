const Koa = require('Koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('./routes');

const app = new Koa();

// 格式化请求log
app.use(logger());

// body解析，必须写在router被注册到app之前
app.use(bodyParser());
// add routers
app.use(router.routes());


app.listen(3000);
console.log('app started at port 3000');


// todo 
// 1、连接mysql、数据存储
// 2、错误处理
// 3、自动生成rest 文档
// 4、mocha测试模块

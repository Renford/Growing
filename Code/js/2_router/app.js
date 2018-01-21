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
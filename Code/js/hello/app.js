const Koa = require('Koa');
const app = new Koa();

let main = async(ctx, next) => {
	await next();
	ctx.response.type = 'text/html';
	ctx.response.body = '<h1>Hello Koa2</h1>';
}

app.use(main);

app.listen(3000);
console.log('app started at port 3000');
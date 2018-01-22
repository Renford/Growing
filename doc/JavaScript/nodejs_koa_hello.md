1、创建package.json，依次填写相关信息

> npm init

```
{
    "name": "hello-koa2",
    "version": "1.0.0",
    "description": "Hello Koa 2 example with async",
    "main": "app.js",
    "scripts": {
        "start": "node app.js"
    },
    "keywords": [
        "koa",
        "async"
    ],
    "author": "renford",
    "license": "MIT",
    "repository": {}
}
```

2、package.json添加依赖

```
"dependencies": {
    "koa": "2.0.0"
}
```

3、安装相关引用

> npm install

4、创建app.js并编写

```
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

```

5、运行，并在浏览器输入`localhost:3000`查看效果
> node app
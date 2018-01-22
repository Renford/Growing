
module.exports = async (ctx, next) => {

    const [name, password] = [ctx.request.query.name, ctx.request.query.password];
    if (name === 'Koa' && password === '123456') {

    	ctx.response.body = 'Login sucess';

    } else {

    	ctx.response.body = 'Login failed';

    }
}

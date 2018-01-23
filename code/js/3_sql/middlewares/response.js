
const controllers = require('../controllers');

module.exports = async (ctx, next) => {

	try {
		await next();

		if (validateUrl(ctx.request.url)) {
			ctx.response.state = 200;
			ctx.response.body = result(0, 'success', ctx.response.body);
		}
	} catch (err) {

		console.log('catch response error:', err);

		if (validateUrl(ctx.request.url)) {
			ctx.response.state = 200;
			ctx.response.body = result(-1, 'fail');
		}
	} finally {
		console.log('error handle finally')

		if (!validateUrl(ctx.request.url)) {
			ctx.response.state = 404;
		}
	}
}

// 验证url是否需要处理
const validateUrl = (url) => {
	return controllers.paths.includes(url);
}

// 格式化输出
const result = (code, message, data) => {
	return {
		code: code,
		message: message,
		data: data
	}
}
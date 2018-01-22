
const controllers = require('../controllers');

module.exports = async (ctx, next) => {

	try {
		await next();

		if (validateUrl(ctx.request.url)) {
			if (ctx.response.body) {
				ctx.response.body = result(0, 'success', ctx.response.body);
			} else {
				ctx.response.body = result(0, 'success');
			}
		}
	} catch (err) {

		console.log('catch response error:', err);
		if (validateUrl(ctx.request.url)) {
			ctx.response.state = 200;
			ctx.response.body = result(-1, 'fail');
		}
	}
}

// 验证url是否需要处理
const validateUrl = (url) => {
	return true;
}

// 格式化输出
const result = (code, message, data) => {
	return {
		code: code,
		message: message,
		data: data
	}
}
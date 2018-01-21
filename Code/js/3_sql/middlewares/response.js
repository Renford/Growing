
module.exports = async (ctx, next) => {

	try {
		await next();

		if (ctx.response.body) {
			ctx.response.body = result(0, 'success', ctx.response.body);
		} else {
			ctx.response.body = result(0, 'success');
		}

	} catch (err) {
		console.log('catch response error:', err);

		ctx.response.state = 200;
		ctx.response.body = result(-1, 'fail');
	}
}

// 格式化输出
const result = (code, message, data) => {
	return {
		code: code,
		message: message,
		data: data
	}
}
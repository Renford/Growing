
const model = require('../models');

const User = model.user;

module.exports = async (ctx, next) => {

	let user = await User.findAll({
		where: {
			name: 'renford'
		}
	})

	if (user == null) {
		user = await User.create({
			name: "renford",
			password: "123456",
			gender: true,
			email: "chaofree3088@sina.com"
		});
	}
 	
	// console.log('response user:', JSON.stringify(user))

 	ctx.response.type = 'json';
	ctx.response.body = user;
}

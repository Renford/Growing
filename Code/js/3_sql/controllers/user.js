
const model = require('../models');

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
 	
	ctx.response.body = JSON.stringify(user);

	console.log('user========', JSON.stringify(user));
}

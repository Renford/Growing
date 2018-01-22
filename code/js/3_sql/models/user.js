const db = require('../db/db.js');

module.exports = db.defineModel('user', {
	name: db.STRING(100),
	password: db.STRING(100),
	gender: db.BOOLEAN,
	email: {
		type: db.STRING(100),
		unique: true
	}
})
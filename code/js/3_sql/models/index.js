const lodash = require('lodash');
const fs = require('fs');
const path = require('path');
const db = require('../db/db.js');

const mapDir = d => {

	const tree = {};

	const mapper = p => fs.statSync(path.join(d, p)).isDirectory();

	const [dirs, files] = lodash.partition(fs.readdirSync(d), mapper);

	files.forEach(file => {
		if (path.extname(file) === '.js') {
			tree[path.basename(file, '.js')] = require(path.join(d, file));
		}
	})

	dirs.forEach(dir => {
		tree[dir] = mapDir(path.join(d, dir));
	})

	return tree;
}

module.exports = mapDir(path.join(__dirname));
module.exports.sync = () => {
	db.sync();
}
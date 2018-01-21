const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const config = require('../config.js');

// Sequelize自动添加属性createAt、updateAt、version
const sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 1000
	}
});

const defineModel = (name, attributes) => {
	let attrs = {};

	// 所有model的属性添加allowNull（非空）
	attrs = formateAttr(attributes);

	// model添加默认属性id
	attrs = addDefaultAttr(attrs);

    return sequelize.define(name, attrs, {
    	tableName: name,
    	timestamps: true,
    	version: true,
    	hooks: {
    		beforeValidate: validateObj,
    	}
    });
}

// 规范输入属性
const formateAttr = (attributes) => {
	const attrs = {};
	for (let key in attributes) {
		let value = attributes[key];
		if (typeof value === 'object' && value['type']) {
			value.allowNull = value.allowNull || false;
			attrs[key] = value;
		} else {
			attrs[key] = {
				type: value,
				allowNull: false
			}
		}
	}

	return attrs;
}

// 添加默认属性
const addDefaultAttr = (attributes) => {
	const attrs = attributes;
	attrs.id = {
		type: Sequelize.UUID,
        primaryKey: true
	};

    return attrs;
}

// 验证obj
const validateObj = obj => {
	let now = Date.now();
	if (obj.isNewRecord) {
		if (!obj.id) {
			obj.id = uuid.v1();
		}

		obj.version = 0;
	} else {
		obj.version++;
	}

	return obj;
}

// 导出Sequelize的所有数据类型
let exp = {
	defineModel: defineModel,
	sync: () => {
		sequelize.sync();
	}
}
exp = Object.assign(exp, Sequelize.DataTypes)

module.exports = exp;
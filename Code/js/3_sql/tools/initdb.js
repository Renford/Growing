
const model = require('../models');

console.log('数据库初始化...');

model.sync();

console.log('数据库初始化完成！');

process.exit(0);
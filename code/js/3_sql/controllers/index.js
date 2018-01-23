const lodash = require('lodash');
const fs = require('fs');
const path = require('path');

const relativePaths = [];

// 映射 d 文件夹下的文件为模块
const mapDir = d => {
    const tree = {};

    // 分组规则
    const mapper = p => fs.statSync(path.join(d, p)).isDirectory();

    // 分为文件夹和文件俩数组
    const [dirs, files] = lodash.partition(fs.readdirSync(d), mapper);

    // 将.js的文件映射到tree
    files.forEach(file => {
        if (path.extname(file) === '.js') {
            relativePaths.push(filePath(d, file));
            tree[path.basename(file, '.js')] = require(path.join(d, file));
        }
    })

    // 递归映射文件夹
    dirs.forEach(dir => {
        tree[dir] = mapDir(path.join(d, dir));
    })

    return tree
}

// 当前文件的相对路径
const filePath = (dir, file) => {
    let relativePath = dir.replace(__dirname, '')
    relativePath  = `${relativePath}/${path.basename(file, '.js')}`
    return relativePath
}

// 导出当前目录结构tree
module.exports = mapDir(path.join(__dirname));
module.exports.paths = relativePaths;

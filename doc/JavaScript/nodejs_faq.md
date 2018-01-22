1、npm install 执行缓慢
	
解决方案：使用淘宝镜像，cnpm代理npm命令

> npm install -g cnpm --registry=https://registry.npm.taobao.org

2、使用sequelize操作mysql报警告
问题描述：

> sequelize deprecated String based operators are now deprecated. Please use Symbol based operators for better security, read more at http://docs.sequelizejs.com/manual/tutorial/querying.html#operators node_modules/sequelize/lib/sequelize.js:237:13

解决方案：

[官方是这么解释的](http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-aliases), 大体是说，由于传给`Sequlize`的字符串可能被解析为js对象，所以为了提高安全性，`Sequlize`官方建议使用操作符别名(operatorsAliases), [具体使用规则](http://docs.sequelizejs.com/manual/tutorial/querying.html)

```
const Op = Sequelize.Op;

//use sequelize without any operators aliases
const connection = new Sequelize(db, user, pass, { operatorsAliases: false });

//use sequelize with only alias for $and => Op.and
const connection2 = new Sequelize(db, user, pass, { operatorsAliases: { $and: Op.and } });
```

当然如果想使用全部默认的操作符别名，可以这么写

```
const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

const connection = new Sequelize(db, user, pass, { operatorsAliases });
```
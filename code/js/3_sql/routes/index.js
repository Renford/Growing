const router = require('koa-router')();

const controllers = require('../controllers');

router.get('/login', controllers.login);

router.get('/user', controllers.user);

module.exports = router;
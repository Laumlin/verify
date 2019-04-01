const Router = require('koa-router');
const Verify = require('../controllers/verify')
const axios =  require('axios')

router = new Router();

router
    .post('/verify', Verify.verifyResult)
module.exports = router;
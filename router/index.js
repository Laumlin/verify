const Router = require('koa-router');
const Verify = require('../controllers/verify')
const axios =  require('axios')

router = new Router();

router
    .post('/verify', Verify.verifyResult)
    .get('/', (ctx) => {
        ctx.response.body = 'hello'
    })
    .post('/token', async (ctx) => {
        await axios.get('https://www.easy-mock.com/mock/5c238c843671d47be5ea8d6b/api/map/bike_list')
            .then(res => {
                ctx.response.body = res.data
            })
            .catch(err => {
                ctx.response.body = err.response.status
            })
    })
    .post('/image', (ctx) => {
        ctx.response.body = ctx.request.body
    })
module.exports = router;
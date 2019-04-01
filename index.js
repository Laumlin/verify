const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const cors = require('koa2-cors');
const app = new Koa();

app.use(bodyParser());

app.use(cors());

app.on('error', (err, ctx) =>
  console.error('server error', err)
);

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8080, () => {
	console.log('The server is running at http://localhost:8080');
});
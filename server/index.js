const path = require('path');
const Koa = require('koa');
const KoaStatic = require('koa-static');
const argv = require('minimist')(process.argv.slice(2));
const ip = require('ip');

const app = new Koa();

const staticPath = path.join(process.cwd(), 'build');

app.use(KoaStatic(staticPath));

app.use(async (ctx) => {
  ctx.body = 'Healthy';
});

const host = argv.host || process.env.HOST || '0.0.0.0';
const port = argv.port || process.env.PORT || 3000;

app.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  console.log(`Localhost: http://${host}:${port}`);
  console.log(`LAN: http://${ip.address()}:${port}`);
  console.log('Press CTRL-C to stop');
});


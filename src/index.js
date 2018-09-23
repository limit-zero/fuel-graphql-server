const env = require('./env');
const pkg = require('../package.json');
const app = require('./app');

const { PORT } = env;

const server = app.listen(PORT, () => {
  process.stdout.write(`Express app '${pkg.name} v${pkg.version}' listening on port ${PORT}\n`);
});

function graceful(options) {
  const { cleanup, exit } = options;
  if (cleanup) {
    const actions = [server.close];
    actions.forEach((close, i) => {
      try {
        close(() => {
          if (i === actions.length - 1) process.exit();
        });
      } catch (e) {
        if (i === actions.length - 1) process.exit();
      }
    });
  }
  if (exit) process.exit();
}

process.on('exit', graceful.bind(null, { cleanup: true }));
process.on('SIGINT', graceful.bind(null, { exit: true }));
process.on('SIGTERM', graceful.bind(null, { exit: true }));

module.exports = server;

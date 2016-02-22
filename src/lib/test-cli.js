const program = require('commander');
const chalk = require('chalk');

export function cli() {
  let settings = {
    ip: null,
    port: null
  };
  let getip = (val) => {
    settings.ip = val;
  };
  let getport = (val) => {
    settings.port = val;
  };

  program.version('0.1.0')
    .option('-b, --broker-ip <ip>', 'broker IP to connect to', getip)
    .option('-p, --port <port>', 'the port to connect to', getport)
    .parse(process.argv);

  if (!settings.ip || settings.ip === null) {
    console.log(chalk.red('No IP for broker provided'));
    console.log(chalk.red('falling back to localhost'));
    settings.ip = 'localhost';
  } else {
    console.log(chalk.green(`connecting broker on ${settings.ip}`));
  }
  if (!settings.port || settings.port === null) {
    console.log(chalk.red('No port for broker provided'));
    console.log(chalk.red('falling back to 1883'));
    settings.port = 1883;
  } else {
    console.log(chalk.green(`connectiong to broker on port ${settings.port}`));

  }
  return settings;
}

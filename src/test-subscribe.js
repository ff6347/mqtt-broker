const mqtt = require('mqtt');
const {cli} = require('./lib/test-cli');
const settings = cli();
// const program = require('commander');
// const chalk = require('chalk');
// // required when running on node.js
// let ip = null;
// let getip = (val) => {
//   ip = val;
// };

// program.version('0.1.0')
//   .option('-b, --broker-ip <ip>', 'broker IP to connect to', getip)
//   .parse(process.argv);

// if (!ip || ip === null) {
//   console.log(chalk.red('No IP for broker provided'));
//   console.log(chalk.red('falling back to localhost'));
//   ip = 'localhost';
// }
// var client = mqtt.connect(`mqtt://${ip}:1883`, {
//   clientId: 'node.subscribe'
// });

let client = mqtt.connect(`mqtt://${settings.ip}:${settings.port}`, {
  clientId: 'node.subscribe'
});

client.on('connect', () => {
  console.log('client has connected!');

  // via wildcard
  // client.subscribe('/fabianmoronzirfas/*/*'); // specific
  client.subscribe('/hello/#'); // all
  // client.unsubscribe('/example');
  // let count = 0;
  // let timer = setInterval(() => {
  //   console.log('publish %s', count);
  //   client.publish('/hello', count);
  //   count++;
  //   if (count === 10) {
  //     clearInterval(timer);
  //     process.exit();
  //   }
  // }, 500);
  client.on('message', (topic, message) => {
    console.log('Received new message. Topic is "%s" message is "%s" ', topic, message.toString());
  // client.publish('fabianmoronzirfas/beep', '1');
  });
});

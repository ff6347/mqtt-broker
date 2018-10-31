const mqtt = require('mqtt');
const {cli} = require('./lib/test-cli');
const settings = cli();

// required when running on node.js
// let ip = null;
// let getip = (val) => {
//   ip = val;
// };

// program.version('0.1.0')
//   .option('-b, --broker-ip <ip>', 'broker IP to connect to', getip)
//   .option('p, --port [port]', 'the port to connect to')
//   .parse(process.argv);

// if (!ip || ip === null) {
//   console.log(chalk.red('No IP for broker provided'));
//   console.log(chalk.red('falling back to localhost'));
//   ip = 'localhost';
// }

let client = mqtt.connect(`mqtt://${settings.ip}:${settings.port}`, {
  clientId: 'node.subscribe'
});


client.on('connect', () => {
  console.log('client has connected!');

  // via wildcard
  // client.subscribe('/fabianmoronzirfas/*/*'); // specific
  // client.subscribe('/helloword/#'); // all
  // client.unsubscribe('/example');
  let count = 0;
  let timer = setInterval(() => {
    console.log('publish %s', count);
    client.publish('/hello', JSON.stringify(count));
    count++;
    if (count === 10) {
      clearInterval(timer);
      process.exit();
    }
  }, 500);
// client.on('message', function(topic, message) {
//   console.log('Received new message. Topic is "%s" message is "%s" ', topic, message.toString());
//   client.publish('fabianmoronzirfas/beep', '1');
// });
});

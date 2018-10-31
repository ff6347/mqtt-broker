const mosca = require('mosca');
// @ts-ignore
const chalk = require('chalk');

// const mosca = require('mosca');

let settings = {
  type: 'mqtt',
  json: false,
  // @ts-ignore
  mqtt: require('mqtt'),
  // host: '127.0.0.1',
  port: 1883
};

let server = new mosca.Server(settings);
server.on('clientConnected', (client) => {
  if (client !== undefined) {
    // @ts-ignore
    console.log(`client ${chalk.green(client.id)} connected`);
  }
  // console.log('client -->', client);
});

server.on('clientDisconnecting', (client) => {
  if (client !== undefined) {
    // @ts-ignore
    console.log(`Client ${chalk.red(client.id)} is disconnecting`);
  }
});

server.on('clientDisconnected', (client) => {
  if (client !== undefined) {
    // @ts-ignore
    console.log(`Client ${chalk.red(client.id)} has disconnected. Bye bye.`);
  }
});

// fired when a message is received
server.on('published', (packet, client) => {
  if (client !== undefined) {
    // @ts-ignore
    console.log(`Client ${chalk.green(client.id)} published a message
      on topic ${chalk.
  // @ts-ignore
    blue(packet.topic)}
      content ${chalk.
  // @ts-ignore
    blue(packet.payload.toString('utf8'))}`);
  }
// console.log(packet);
// console.log('Received %s from %s', packet.payload, client.id);
// console.log('Published', packet.payload);
});

server.on('unsubscribed', (topic, client) => {
  if (client !== undefined) {
    // @ts-ignore
    console.log(`Client ${chalk.red(client.id)} unsubscribed from ${chalk.blue(topic)}`);
  }
// console.log(packet);
// console.log('Received %s from %s', packet.payload, chalk.red(client.id));
// console.log('Published', packet.payload);
});

server.on('subscribed', (topic, client) => {
  if (client !== undefined) {
    // @ts-ignore
    console.log(`Client ${chalk.green(client.id)} subscribed to ${chalk.blue(topic)}`);
  }
// console.log(packet);
// console.log('Received %s from %s', packet.payload, client.id);
// console.log('Published', packet.payload);
});

// fired when the mqtt server is ready
server.on('ready', () => {
  // @ts-ignore
  console.log(chalk.bold.black.bgGreen('Mosca server is up and running'));
});

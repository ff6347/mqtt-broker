'use strict';

var _mosca = require('mosca');

var mosca = _interopRequireWildcard(_mosca);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj; return newObj;
  }
}

var chalk = require('chalk');

// const mosca = require('mosca');

var settings = {
  type: 'mqtt',
  json: false,
  mqtt: require('mqtt'),
  host: '127.0.0.1',
  port: 1883
};

var server = new mosca.Server(settings);
server.on('clientConnected', function(client) {
  if (client !== undefined) {
    console.log('client ' + chalk.green(client.id) + ' connected');
  }
// console.log('client -->', client);
});

server.on('clientDisconnecting', function(client) {
  if (client !== undefined) {
    console.log('Client ' + chalk.red(client.id) + ' is disconnecting');
  }
});

server.on('clientDisconnected', function(client) {
  if (client !== undefined) {
    console.log('Client ' + chalk.red(client.id) + ' has disconnected. Bye bye.');
  }
});

// fired when a message is received
server.on('published', function(packet, client) {
  if (client !== undefined) {
    console.log('Client ' + chalk.green(client.id) + ' published a message\n      on topic ' + chalk.blue(packet.topic) + '\n      content ' + chalk.blue(packet.payload.toString('utf8')));
  }
// console.log(packet);
// console.log('Received %s from %s', packet.payload, client.id);
// console.log('Published', packet.payload);
});

server.on('unsubscribed', function(topic, client) {
  if (client !== undefined) {
    console.log('Client ' + chalk.red(client.id) + ' unsubscribed from ' + chalk.blue(topic));
  }
// console.log(packet);
// console.log('Received %s from %s', packet.payload, chalk.red(client.id));
// console.log('Published', packet.payload);
});

server.on('subscribed', function(topic, client) {
  if (client !== undefined) {
    console.log('Client ' + chalk.green(client.id) + ' subscribed to ' + chalk.blue(topic));
  }
// console.log(packet);
// console.log('Received %s from %s', packet.payload, client.id);
// console.log('Published', packet.payload);
});

// fired when the mqtt server is ready
server.on('ready', function() {
  console.log(chalk.bold.black.bgGreen('Mosca server is up and running'));
});
//# sourceMappingURL=index.js.map

import * as mqtt from 'mqtt';

// required when running on node.js

var client = mqtt.connect('mqtt:localhost:1883', {
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

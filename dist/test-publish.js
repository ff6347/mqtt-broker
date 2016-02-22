'use strict';

var _mqtt = require('mqtt');

var mqtt = _interopRequireWildcard(_mqtt);

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

// required when running on node.js

var client = mqtt.connect('mqtt:localhost:1883', {
  clientId: 'node.publish'
});

client.on('connect', function() {
  console.log('client has connected!');

  // via wildcard
  // client.subscribe('/fabianmoronzirfas/*/*'); // specific
  // client.subscribe('/helloword/#'); // all
  // client.unsubscribe('/example');
  var count = 0;
  var timer = setInterval(function() {
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
//# sourceMappingURL=test-publish.js.map

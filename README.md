# serialized-storage

Tiny wrapper around {local|session}storage serialization.

### Installation

    $ npm i serialized-storage

### Usage

```js
var SerializedStorage = require('serialized-storage');

var session = new SerializedStorage(sessionStorage, {
  root: 'app-session',
  // for repeatable reads on each `get`, default is false.
  sync: true,
  // by default, coder is JSON
  coder: {
    parse: function(str) {
      return JSON.parse(unrot13(str));
    },
    stringify: function(data) {
      return rot13(JSON.stringify(data));
    }
  }
});

session.set('userId', 42);
session.get('userId');
// 42
```

### License

MIT

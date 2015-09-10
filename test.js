var assert = require('assert');
var SerializedStorage = require('./');

var localStorage = {};

describe('serialized-storage', function() {
  it('serializes data', function() {
    var storage = new SerializedStorage(localStorage, { root: 'foo' });

    storage.set('bar', 'baz');

    assert.equal(storage.get('bar'), 'baz');
    assert.deepEqual(storage.data, { bar: 'baz' });
    assert.equal(localStorage.foo, '{"bar":"baz"}');
  });

  it('#update', function() {
    var storage = new SerializedStorage(localStorage, { root: 'foo' });

    storage.set('foo', 'bar');
    storage.set('bar', 'baz');
    storage.update({ bar: 'qux', qux: 'baz' });

    assert.deepEqual(storage.data, { foo: 'bar', bar: 'qux', qux: 'baz' });
    assert.deepEqual(JSON.parse(localStorage.foo), storage.data);
  });

  it('#delete', function() {
    var storage = new SerializedStorage(localStorage, { root: 'foo' });

    storage.update({ foo: 'bar', bar: 'baz' });
    var result = storage.remove('foo');

    assert.equal(result, 'bar');
    assert.deepEqual(JSON.parse(localStorage.foo), storage.data);
  });

  it('#clear', function() {
    var storage = new SerializedStorage(localStorage, { root: 'foo' });

    storage.update({ foo: 'bar', bar: 'baz' });
    storage.clear();

    assert.equal(localStorage.foo, '{}');
  });
});

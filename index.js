'use strict';

module.exports = SerializedStorage;

function SerializedStorage(storage, options) {
  this.storage = storage;
  this.data = {};
  this.coder = options.code || JSON;
  this.sync = options.sync || true;
  this.root = options.root;
  this.read();
}

var proto = SerializedStorage.prototype;

proto.read = function() {
  return this.data = this.coder.parse(this.storage[this.root] || null) || {};
}

proto.write = function() {
  this.storage[this.root] = this.coder.stringify(this.data);
}

proto.get = function(key) {
  if (this.sync) {
    this.read();
  }

  return this.data[key];
}

proto.set = function(key, value) {
  this.data[key] = value;
  this.write();

  return value;
}

proto.update = function(obj) {
  for (var key in obj) {
    this.data[key] = obj[key];
  }

  this.write();

  return this.data;
}

proto.remove = function(key) {
  var value = this.data[key];
  delete this.data[key];
  this.write();

  return value;
}

proto.clear = function() {
  this.data = {};
  this.write();
}

'use strict'

const h       = require('highland')
    , request = require('superagent')
    , assert  = require('assert');

const doPost = (url, payload, cb) => {
  request
    .post(url)
    .send(payload)
    .set({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .end(cb);
};

const doPostNoPayload = (url, cb) => {
  request
    .post(url)
    .set({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .end(cb);
};

const doGet = (url, cb) => {
  request
    .get(url)
    .set({'Accept': 'application/json'})
    .end(cb);
};

const doDelete = (url, cb) => {
  request
    .delete(url)
    .set({'Accept': 'application/json'})
    .end(cb);
};

module.exports = Sully;

function Sully(opts){
  if (!(this instanceof Sully)) return new Sully(opts);
  if (!opts) opts = {};

  this.seleniumUrl = `${opts.server}:${opts.port}/wd/hub`;
  this.actions = [];
}

Sully.prototype.init = function (opts, cb) {
  doPost(`${this.seleniumUrl}/session`, opts, (err, res) => {
    if(err) return cb(err);
    this.sessionUrl = `${this.seleniumUrl}/session/${res.body.sessionId}`
    cb(null, res.body.status);
  });

  return this;
};

Sully.prototype.close = function (cb) {
  doDelete(`${this.sessionUrl}`, (err, res) => {
    if(err) return cb(err, null);
    cb(null, res.body.status);
  });
  return this;
};

Sully.prototype.navigateTo = function (testUrl) {
  this.actions.push(cb => doPost(`${this.sessionUrl}/url`, { "url": testUrl }, cb));
  return this;
};

Sully.prototype.title = function () {
  this.actions.push(cb => doGet(`${this.sessionUrl}/title`, cb));
  return this;
};

Sully.prototype.firstElement = function (cssPath) {
  this.actions.push(cb => {

    // 1 sec TIMEOUT used to allow for page refreshes to complete before searching for an element.
    setTimeout(() => {
      doPost(`${this.sessionUrl}/element`, {"using": "css selector", "value": cssPath}, (err, res) => {
        this.lastElementId = res.body.value.ELEMENT;
        cb(err, res);
      });
    }, 1000);

  });

  return this;
};

Sully.prototype.type = function (text) {
  this.actions.push(cb => doPost(`${this.sessionUrl}/element/${this.lastElementId}/value`, {"value": text.split('')}, cb));
  return this;
};

Sully.prototype.click = function () {
  this.actions.push(cb => doPostNoPayload(`${this.sessionUrl}/element/${this.lastElementId}/click`, cb));
  return this;
};

Sully.prototype.text = function () {
  this.actions.push(cb =>  doGet(`${this.sessionUrl}/element/${this.lastElementId}/text`, cb));

  return this;
};

Sully.prototype.val = function (cb) {
  h(this.actions)
  .nfcall([])
  .series()
  .toArray(data => {
    const result = data[data.length - 1];
    this.actions = [];
    cb(result.body.value);
  });

  return this;
};

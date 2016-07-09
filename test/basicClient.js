'use strict';

const sully   = require('../index')
    , assert  = require('assert');

const client = sully({
  server: 'http://127.0.0.1',
  port: '4444'
});

describe('Basic Selenium Client', function () {

  this.timeout(20000);

  before(function (done) {
    client.init({
      desiredCapabilities: {
        browserName: "firefox",
        platform: "MAC"
      }
    }, done);
  });

  after(function (done) {
    client.close(done);
  });

  beforeEach(function () {
    client
    .navigateTo("http://www.google.com");
  });

  it('can navigate to google', function (done) {
    client
    .title()
    .val(title => {
      assert(/google/i.test(title), 'title should match google.');
      done();
    })
  });

  it('can search google for the BBC', function (done) {
    client
    .firstElement('input#lst-ib.gsfi')
    .type('bbc')
    .firstElement('div#sblsbb button.lsb')
    .click()
    .firstElement('div.f cite._Rm b')
    .text()
    .val(text => {
      assert(/bbc/i.test(text), 'text should include bbc.');
      done();
    });
  });

});
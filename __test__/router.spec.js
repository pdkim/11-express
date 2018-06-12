'use strict';

let parser = require('../src/lib/parser.js');

describe('URL Parser', () => {

  xit('requires a request object', () => {
    let req = undefined;
    return parser(req)
      .then(() => false)
      .catch(err => expect(err).toBeDefined());
  });

  xit('requires a request object with a url', () => {
    let req = {};
    return parser(req)
      .then(() => false)
      .catch(err => expect(err).toBeDefined());
  });

  xit('returns object when given a url', () => {
    let req = { url: 'http://localhost' };
    return parser(req)
      .then(request => expect(typeof request.url).toEqual('object'))
      .catch(() => false);
  });


  xit('returns multiple content when passed', () => {
    let req = { method: 'GET', url: 'http://localhost?a=1&b=2' };
    return parser(req)
      .then(request => {
        expect(request.query.a).toEqual('1');
        expect(request.query.b).toEqual('2');
      })
      .catch(console.error);
  });
})
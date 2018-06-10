'use strict';

let router = require('../src/lib/router.js');

describe('Router', () => {

  xit('regiesters multiple types of routes', () => {
    router.get('/', () => true);
    router.put('/', () => true);
    router.post('/', () => true);
    router.patch('/', () => true);
    router.delete('/', () => true);
    expect( router.routes.GET['/']).toBeDefined();
    expect( router.routes.PUT['/']).toBeDefined();
    expect( router.routes.POST['/']).toBeDefined();
    expect( router.routes.PATCH['/']).toBeDefined();
    expect( router.routes.DELETE['/']).toBeDefined();
  });

  xit('creates multiple routes of same type', () => {
    router.routes.GET = {};
    router.get('/a', () => true);
    router.get('/b', () => true);
    router.get('/c', () => true);
    expect( Object.keys(router.routes.GET).length ).toEqual(3);
  });

  xit('can route get requests', () => {
    let expected = 'get/test';
    router.get('/test', () => expected);
    let req = { method: 'GET', url: 'http://localhost/test?foobar' };
    let res = {};
    return router.route(req,res)
      .then( result => expect(result).toEqual(expected));
  });

});
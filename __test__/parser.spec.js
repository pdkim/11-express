'use strict';

let router = require('../src/lib/router.js');

describe('Router', () => {

  it('can run multiple types of routes', () => {
    router.get('/', () => true);
    router.post('/', () => true);
    router.delete('/', () => true);
    expect( router.routes.GET['/']).toBeDefined();
    expect( router.routes.POST['/']).toBeDefined();
    expect( router.routes.DELETE['/']).toBeDefined();
  });

  it('can retrieve multiple files at once', () => {
    router.routes.GET = {};
    router.get('/a', () => true);
    router.get('/b', () => true);
    router.get('/c', () => true);
    expect( Object.keys(router.routes.GET).length ).toEqual(3);
  });

  it('can route get requests', () => {
    let expected = 'get/student';
    router.get('/student', () => expected);
    let req = { method: 'GET', url: 'http://localhost/student?id' };
    let res = {};
    return router.route(req,res)
      .then( result => expect(result).toEqual(expected));
  });

});
'use strict';

import express from 'express';

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

import router from '../src/api/api.js';
app.use(router);


describe('Router', () => {

  it('can run multiple types of routes', () => {
    router.get('/', () => true);
    router.post('/', () => true);
    router.delete('/', () => true);
    const actualGet = router.get('/', () => true);
    const actualPost = router.post('/', () => true);
    const actualDel =  router.delete('/', () => true);
    expect(actualGet).toBeDefined();
    expect(actualPost).toBeDefined();
    expect(actualDel).toBeDefined();
  });

  xit('can retrieve multiple files at once', () => {

    //router.routes.GET = {};
    router.stack.get = {};
    router.get('/a', () => true);
    console.log(router.stack.get);
    router.get('/b', () => true);
    // console.log(router.param);
    router.get('/c', () => true);
    // console.log(router.param);
    //expect( Object.keys(router.routes.GET).length ).toEqual(3);
    expect(Object.keys(router.stack.get).length).toEqual(3);
  });

  xit('can route get requests', () => {
    let expected = 'get/student';
    router.get('/student', () => expected);
    let req = { method: 'GET', url: 'http://localhost/student?id' };
    let res = {};
    return router.route(req,res)
      .then( result => expect(result).toEqual(expected));
  });

});
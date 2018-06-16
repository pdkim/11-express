'use strict';

import superagent from 'superagent';

import app from '../src/app.js';


describe('API module should', () => {

  beforeAll( () => {
    app.start(3001);
  });

  afterAll( () => {
    app.stop();
  });

  it('return 404 error when no id is present', () => {

    superagent
      .get('http://localhost:3001/api/v1/worker/1223')
      // .then(data => {
      //   expect(data).toBeUndefined();
      // })
      .catch(res => {
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toBe('Not Found');
      });
  });
});
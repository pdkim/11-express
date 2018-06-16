'use strict';

import superagent from 'superagent';

import app from '../src/app.js';


describe('API module should', () => {

  beforeAll(() => {
    app.start(3001);
  });

  afterAll(() => {
    app.stop();
  });

  it('return 404 status code when an invalid id is passed', () => {
    superagent
      .get('http://localhost:3001/api/v1/worker/1223')
      .catch(res => {
        expect(res.statusCode).toBe(404);
      });
  });

  it('return 400 status code when no id is entered', () => {
    superagent
      .get('http://localhost:3001/api/v1/worker/')
      .catch(res => {
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe('Bad Request');
      });
  });

  it('return 200 status code when a valid id is entered', () => {
    let id;
    superagent
      .post('http://localhost:3001/api/v1/worker/')
      .send({
        firstName: 'Phil',
        lastName: 'Kim',
        hourlyWage: '$50',
      })
      .then(data => {
        id = data.params.id;
      })
      .catch(res => console.error('post failed at ', res));

    superagent
      .get(`http://localhost:3001/api/v1/worker/${id}`)
      .then(res => {
        expect(res.statusCode).toBe(200);
      })
      .catch(res => console.error(res));
  });

  xit('return 400 status code when attempting to post without content', () => {
    superagent
      .post('http://localhost:3001/api/v1/worker/')
      .catch(res => {
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe('Bad Request');
      });
  });

  it('return 200 status code when posting with content', () => {
    superagent
      .post('http://localhost:3001/api/v1/worker/')
      .send({
        firstName: 'Phil',
        lastName: 'Kim',
        hourlyWage: '$50',
      })
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
      })
      .catch(res => console.error(res));
  });
});
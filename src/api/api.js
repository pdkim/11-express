'use strict';

import express from 'express';
const router = express.Router();

import Worker from '../lib/models/worker.js';


/**
 * @param res
 * @param data
 */


let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'ok';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

let serverError = (res, err) => {
  let error = { error: err };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};


//GET ONE
router.get('/api/v1/worker/:id', (req, res) => {
  if (req.params.id) {
    Worker.findOne(req.params.id)
      .then(data => sendJSON(res, data))
      .catch(err => serverError(res, err));
  }
  else {
    serverError(err, 'Not Found');
  }
});

//GET ALL
router.get('/api/v1/worker/', (req, res) => {
  if (req.params.body === undefined) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.send('Bad Request');
  }
  else {
    Worker.fetchAll()
      .then(data => sendJSON(res, data))
      .catch(err => serverError(res, err));
  }
});

//DELETE
router.delete('/api/v1/worker/:id', (req, res) => {
  if (req.params.id === '' || !req.params.id) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.send('Bad Request');
  }
  else {
    Worker.deleteOne(req.params.id)
      .then(() => {
        res.statusCode = 204;
        res.statusMessage = 'OK';
        res.end();
      })
      .catch(console.error);
  }
});

//POST
router.post('/api/v1/worker', (req, res) => {
  if (req.body.firstName === undefined && req.body.lastName === undefined && req.body.hourlyWage === undefined) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.send('Bad Request');
  }
  else {
    let record = new Worker(req.body);

    record.save()
      .then(data => sendJSON(res, data))
      .catch(console.error);
  }
});


export default router;
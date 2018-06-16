'use strict';

import express from 'express';
const router = express.Router();

import Worker from '../lib/models/worker.js';


/**
 * @param res
 * @param data
 */


let sendJSON = (res, data) => {
  res.status(200);
  res.json(data);
};

let serverError = (res, err) => {
  let error = { error: err };
  res.status(404);
  res.json(error);
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
    res.status(400).send('Bad Request');
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
    res.status(400).send('Bad Request');
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
    res.status(400).send('Bad Request');
  }
  else {
    let record = new Worker(req.body);

    record.save()
      .then(data => sendJSON(res, data))
      .catch(console.error);
  }
});


export default router;
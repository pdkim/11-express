'use strict';

//const router = require('../lib/router.js');
import express from 'express';
const router = express.Router();

// const Notes = require('../lib/models/notes.js');
import Notes from '../lib/models/notes.js';
import Worker from '../lib/models/worker.js';
import { worker } from 'cluster';


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


//GET all
router.get('/api/v1/worker', (req, res) => {
  Worker.fetchAll()
    .then(data => sendJSON(res, data))
    .catch(err => serverError(res, err));
});

//GET One
router.get('/api/v1/persist', (req, res) => {
  if (req.query.id === '' || !req.query.id) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Bad Request');
    res.end();
  }
  else if (req.query.id) {
    Worker.findOne(req.query.id)
      .then(data => sendJSON(res, data))
      .catch(err => serverError(res, err));
  }
  else {
    Worker.fetchAll()
      .then(data => sendJSON(res, data))
      .catch(err => serverError(res, err));
  }
});

//DELETE
router.delete('/api/v1/persist', (req, res) => {
  if (req.query.id === '' || !req.query.id) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Bad Request');
    res.end();
  }
  else {
    Worker.deleteOne(req.query.id)
      .then(() => {
        res.statusCode = 204;
        res.statusMessage = 'OK';
        res.end();
      })
      .catch(console.error);
  }
});

//POST
router.post('/api/v1/persist', (req, res) => {

  let record = new Worker(req.body);

  record.save()
    .then(data => sendJSON(res, data))
    .catch(console.error);
});



// module.exports = {};
export default router;
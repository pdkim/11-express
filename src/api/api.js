'use strict';

const router = require('../lib/router.js');
const Notes = require('../lib/models/notes.js');

/**
 * Simple method to send a JSON response (all of the API methods will use this)
 * @param res
 * @param data
 */


//review from here on down for lab requirements
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


//GET
router.get('/api/v1/persist', (req, res) => {
  if (req.query.id === '' || !req.query.id) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Bad Request');
    res.end();
  }
  else if (req.query.id) {
    Notes.findOne(req.query.id)
      .then(data => sendJSON(res, data))
      .catch(err => serverError(res, err));
  }
  else {
    Notes.fetchAll()
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
    Notes.deleteOne(req.query.id)
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

  let record = new Notes(req.body);

  record.save()
    .then(data => sendJSON(res, data))
    .catch(console.error);
});



module.exports = {};
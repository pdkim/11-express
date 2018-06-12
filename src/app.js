'use strict';

let http = require('http');

const router = require('./lib/router.js');
const api = require('./api/api.js');

let alreadyRunning = false;

const app = http.createServer(router.route);

module.exports = {
  start: (port) => {
    if(!alreadyRunning) {
      app.listen(port, (err) =>{
        if(err) {throw err;}

        alreadyRunning = true;
        console.log('Server is up on port', port);
      });
    }
    else {
      console.log('Server already running on port', port);
    }
  },

  stop: () => {
    app.close( () => {
      alreadyRunning = false;
      console.log('Server is closed');
    });
  },
};

console.log(api);
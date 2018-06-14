'use strict';

//const memoryStorage = require('./memory.js');
import memoryStorage from './memory.js';

//const fileStorage = require('./filesystem.js');
import fileStorage from './filesystem.js';

let dataStorageModule = {};


switch (process.env.STORAGE) {
case 'filesystem':
  dataStorageModule = fileStorage;
  break;

default:
  dataStorageModule = memoryStorage;
  break;
}

//module.exports = dataStorageModule;
export default dataStorageModule;
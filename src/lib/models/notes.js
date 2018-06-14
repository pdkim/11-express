'use strict';

// const storage = require('../storage/data-store.js');
import storage from '../storage/data-store.js';

//const uuid = require('uuid/v1');
import uuid from 'uuid/v1';

class Note {
  /**
   * @param config
   */

  constructor(config) {
    this.id = uuid();
    this.createOn = new Date();
    this.title = config && config.title || '';
    this.content = config && config.content || '';
  }

  /**
   * @returns {*}
   */
  save() {
    return storage.save(this);
  }

  /**
   * @returns {*}
   */

  static fetchAll() {
    return storage.getAll();
  }

  static findOne(id) {
    return storage.get(id);
  }

  static updateOne(criteria) {
    console.log(criteria);
    return storage.update(this);
  }

  static deleteOne(id) {
    return storage.delete(id);
  }

}

// module.exports = Note;
export default Note;
'use strict';
/**
 * @module {} /src/middleware/500.js
 * creates 500 error
 */
module.exports = (err, req, res, next) => {
  console.log('__SERVER_ERROR__', err);
  let error = { error: err.message || err };
  res.status(500).json(error);
};

'use strict';
/**
 * @module {} /src/middleware/500.js
 * creates 404 error
 */
module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.status(404).json(error);
};

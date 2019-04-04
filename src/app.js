'use strict';
/**
 * @module {} src/app.js
 * exports the fact that the server is running.
 * Imports the authRouter from router.js
 * Imports all error handlers
 */
// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( './middleware/500.js');
const notFound = require( './middleware/404.js' );
const authRouter = require( './auth/router.js' );

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(authRouter);

// Catchalls
app.use(notFound);
app.use(errorHandler);

let isRunning = false;
/**
 * @param  {} port
 * listens for port running
 * Lets us know that port is up
 */
module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};

![CF](http://i.imgur.com/7v5ASc8.png) LAB 13
=================================================

## Bearer Token Authorization

### Author: Aaron Ferris

### Links and Resources
* [Pull request](http://xyz.com)
* [travis](http://xyz.com)
* [front-end](https://peaceful-mountain-92990.herokuapp.com/) (when applicable)

#### Documentation
* [swagger](http://xyz.com) (API assignments only)
* [jsdoc](http://xyz.com) (All assignments)

### Modules
#### `index.js`
* Imports start function from app and runs the app on port
#### `app.js`
 * exports the fact that the server is running.
 * Imports the authRouter from router.js
 * Imports all error handlers
 * exports to index the start and listen function to run app
#### `router.js`
 * exports authRouter:
 * puts together post route for signup
 * puts together post route for signin
 * puts together auth route for token
#### `middleware.js`
 * exports the handling of request and response to create auth bearer tokens, basic tokens and to overall authenticate
 * has a switch that decides type of authentication
 * contains the implementation of bearer, or basic authentication
 * authenticates user
#### `users-model.js`
 *  creates and exports the user schema
 * parameters:
    * username
    * password
    * email
    * role
   * create from oauth
   * pre
   * autheticate bearer
   * authenticate basic
   * compare  password
#### `google.js`
 * brings in the users model
 * posts the oauth token and with the response gets the access token, using that token to connect via bearer.
 * creates the superagent ruequest bringing to gether everything from the user model and creates the authorize for export

#### `404.js`
 * creates 404 error

#### `500.js`
 * creates 500 error


### Setup
#### `.env` requirements
* run `npm i` to get all dependancies
* ensure you have a .env file in the bas with
  * PORT (3000 in this case)
  * MONGODB_URI=mongodb://localhost:27017/oauth
  * SECRET (whatever you want it to be)

#### Running the app
* in the base of folder, run mongo
* ensure you have a db folder in your computer
* in another 
  * run `mongod -dbpath=/Users/filepath_to_db/db` 
  * ensure to replace with your own filepath
  * this makes sure you have prequisite filepath
* in the other 
  * nodemon or live server
* Endpoint: `/bing/zing/`
  * Returns a JSON object with xyz in it.
  
#### Tests
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?

#### UML
Link to an image of the UML for your application and response to events

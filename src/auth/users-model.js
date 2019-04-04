'use strict';
/**
 * @module {} /src/auth/users-model.js
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/**
 * @schema  {} creates the user
 * parameters:
 * username
 * password
 * email
 * rle
 * create from oauth
 * pre
 * autheticate bearer
 * authenticate basic
 * compare  password
 * generate token
 */
const users = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  email: {type: String},
  role: {type: String, default:'user', enum: ['admin','editor','user']},
});
//expiration timer at 900
let expiration = 900;
let secretAddon = Math.floor(Math.random()*1000000)


users.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(console.error);
});

users.statics.createFromOauth = function(email) {

  if(! email) { return Promise.reject('Validation Error'); }

  return this.findOne( {email} )
    .then(user => {
      if( !user ) { throw new Error('User Not Found'); }
      console.log('Welcome Back', user.username);
      return user;
    })
    .catch( error => {
      console.log('Creating new user');
      let username = email;
      let password = 'none';
      return this.create({username, password, email});
    });

};

users.statics.authenticateBearer= function(token) {
  let parsedToken = jwt.verify( token, process.env.SECRET);
  console.log(parsedToken);
  let  id = parsedToken.id;
  return this.findOne({_id:id})
}

users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};

users.methods.comparePassword = function(password) {
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};



users.methods.generateToken = function() {
  
  let token = {
    id: this._id,
    role: this.role,
  };
  // added modifications: 
  // secretAddon in order to randomize for one time. 
  // expiration: put a timer on it
  //
  return jwt.sign(token, process.env.SECRET + secretAddon, {expiresIn: expiration});
};


module.exports = mongoose.model('users', users);

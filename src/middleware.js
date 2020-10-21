// Imports
const jwt = require('jsonwebtoken'); // Login keys
const mongoose = require('mongoose'); // Verify keys and users
const bcrypt = require('bcrypt'); // Password encryption

// Config
const expireTime = '30m';

// Middleware
module.exports = {
  // Put before actual login to create tokens
  createTokens(req, res, next){
    if(req.user == null) res.status(401).send("Please inform user information for login");
    req.jwkeysAuth = jwt.sign(req.user, process.env.JSON_SHUSH, {expiresIn: expireTime});
    return next();
  },
  // Verifies auth token and autorefreshes token if expired
  authToken(req, res, next){
    const authToken = req.headers['auth'];
    if(authToken == null) return res.status(401).send("No auth token, please login.");

    jwt.verify(authToken, process.env.JSON_SHUSH, async (error, decoded)=>{
      if(error){
        console.log(error, Date.now());
        return res.status(403).send("Not authorized, please login");
      }else{
        req.user = decoded;
        return next();
      }
    });
  },
  // Encrypts password
  async encrypt(req ,res, next){
    // console.log(req.body);
    req.body.passwd = await bcrypt.hash(req.body.passwd, 10);
    return next();
  }
}
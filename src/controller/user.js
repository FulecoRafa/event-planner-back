const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

module.exports = {
  register(req, res, next){
    User.create(req.body)
      .then(data=>{
        res.status(201).send({
          type: "message",
          text: "User created succesfully"
        })
      }).catch(err => {
        res.status(400).send({
          type: 'err',
          text: err.keyPattern.username===1 ? "This username is already taken by another user" : "There was an error registering you"
        })
      })
  },

  auth(req, res, next){
    User.findOne({username: req.body.username})
      .then(user=>{
        bcrypt.compare(req.body.passwd, user.passwd, function(err, response) {
          if (err) res.status(500).send({
            type: 'err',
            text: "There was an internal error in the server"
          });
          if (response){
            req.user = user.toObject();
            return next();
          }else return res.status(403).send({
            type: 'err',
            text: "Incorrect password"
          });
        });
      })
      .catch(err=>{
        res.status(400).send({
          type: 'err',
          text: "User not found"
        });
      });
  },
  login(req, res, next){
    return res.status(200).send({
      type: "keys",
      auth: req.jwkeysAuth,
    });
  },
  getById(req, res, next){
    User.findById(req.params.id)
      .then(data => {
        res.found = data;
        return next();
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({
          type: 'err',
          text: 'Could not find user specified'
        });
      });
  },

  checkPermission(req,res,next){
    res.status(200).send({
      type: 'data',
      data: {
        username: req.user.username,
        id: req.user._id
      }
    })
  }
}
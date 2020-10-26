const mongoose = require('mongoose');
const Invite = mongoose.model('Invite');

module.exports = {
  create(req, res, next){
    Invite.create({event: req.body.event, sender: req.user._id, receiver: req.found._id})
      .then(data => {
        res.status(201).send({
          type: 'message',
          text: 'Invite sent'
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({
          type: 'err',
          text: 'There was an error sending the invitate'
        });
      });
  },
  getByUser(req, res, next){
    Invite.find({receiver: req.user._id})
      .populate('sender')
      .then(data => {
        res.status(200).send({
          type: 'data',
          data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({
          type: 'err',
          text: 'Couldn\'t retrive invites'
        });
      });
  },
  remove(req, res, next){
    Invite.findByIdAndDelete(req.params.id)
      .then(data => {
        res.status(200).send({
          type: 'message',
          text: req.message
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({
          type: 'err',
          text: 'There was an error with your invite'
        })
      })
  }
}
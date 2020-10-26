const mongoose = require('mongoose')
const Event = mongoose.model('Event')

module.exports = {
  create(req, res, next){
    if(req.hasEvent) return res.status(402).send({
      type: 'err',
      text: 'There is already an event at this period'
    });
    Event.create({...req.body, users: [req.user._id]})
      .then(data => {
        res.status(201).send({
          type: 'message',
          text: 'Event created successfully'
        })
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({
          type: 'err',
          text: 'There was an error creating the event. Try again later...'
        })
      });
  },
  remove(req, res, next){
    Event.findByIdAndDelete(req.params.id)
      .then(data => {
        res.status(200).send({
          type: 'message',
          text: 'Event removed successfully'
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).send({
          type: 'err',
          text: 'There was an error removing the event. Try again later'
        })
      });
  },
  getByUser(req, res, next){
    Event.find({users: req.user._id}, 'name startStamp endStamp color')
      .then(data => {
        res.status(200).send({
          type: 'data',
          data
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).send({
          type: 'err',
          text: 'Could not find events related to this user'
        })
      })
  },
  update(req, res, next){
    if(req.hasEvent) return res.status(402).send({
      type: 'err',
      text: 'There is already an event at this period'
    });
    Event.findByIdAndUpdate(req.params.id, req.body)
      .then(data => {
        res.status(200).send({
          type: 'message',
          text: 'Event updated successfully'
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({
          type: 'err',
          text: 'Error trying to update event. Try again later'
        })
      })
  },
  addUser(req, res, next){
    Event.findById(req.params.id)
      .then(event => {
        Event.find({
          $or: [
            {
              $and: [
                {startStamp: {$lte: event.startStamp}},
                {endStamp: {$gt: event.startStamp}}
              ]
            },
            {
              $and: [
                {startStamp: {$lte: event.endStamp}},
                {endStamp: {$gt: event.endStamp}}
              ]
            }
          ],
          users: req.user._id,
          _id: {$ne: req.params.id}
        })
          .then(data => {
            if(data.length <= 0) {
              req.message = "You were already part of this event"
              console.log(event.users, req.user._id)
              if(!event.users.includes(req.user._id)){
                event.users = [...event.users, req.user._id];
                req.message = "Invite accepted"
              }
              event.save()
                .then(data => {
      
                  next();
                })
                .catch(err => {
                  console.log(err);
                  res.status(400).send({
                    type: 'err',
                    text: 'There was an error updating event'
                  });
                });
            }else{
              res.status(402).send({
                type: 'err',
                text: 'There is already an event at this period'
              });
            }
          })
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({
          type: 'err',
          text: 'Event not found'
        });
      });
  },
  check(req, res, next){
    Event.find({
      $or: [
        {
          $and: [
            {startStamp: {$lt: req.body.startStamp}},
            {endStamp: {$gt: req.body.startStamp}}
          ]
        },
        {
          $and: [
            {startStamp: {$lt: req.body.endStamp}},
            {endStamp: {$gt: req.body.endStamp}}
          ]
        }
      ],
      users: req.user._id,
      _id: {$ne: req.params.id}
    })
      .then(data => {
        console.log(data)
        if(data.length > 0) req.hasEvent = true
        else req.hasEvent = false
        next()
      })
  }
}
const routes = require('express').Router();

const middleware = require('../middleware');
const controller = require('../controller/invite');

const getUser = require('../controller/user').getByUsername;
const updateEvent = require('../controller/event').addUser;

routes.post('/', middleware.authToken, getUser, controller.create);
routes.get('/', middleware.authToken, controller.getByUser);
routes.post('/accept/:id/:inviteId', middleware.authToken, updateEvent, controller.remove);
routes.post('/decline/:inviteId', middleware.authToken, controller.remove);

module.exports = routes;
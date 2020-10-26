const routes = require('express').Router();

const middleware = require('../middleware');
const controller = require('../controller/invite');

const getUser = require('../controller/user').getById;
const updateEvent = require('../controller/event').addUser;

routes.post('/', middleware.authToken, getUser, controller.create);
routes.get('/', middleware.authToken, controller.getByUser);
routes.post('/accept', middleware.authToken, updateEvent, controller.remove);
routes.post('/decline', middleware.authToken, controller.remove);

module.exports = routes;
const routes = require('express').Router();

const middleware = require('../middleware');
const controller = require('../controller/invite');

const getUser = require('../controller/user').getByUsername;
const {addUser, check} = require('../controller/event');

routes.post('/', middleware.authToken, getUser, controller.create);
routes.get('/', middleware.authToken, controller.getByUser);
routes.post('/accept/:id/:inviteId', middleware.authToken, addUser, controller.remove);
routes.post('/decline/:inviteId', middleware.authToken, controller.remove);

module.exports = routes;
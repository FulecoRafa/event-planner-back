const routes = require('express').Router();

const middleware = require('../middleware');
const controller = require('../controller/event');

routes.post('/', middleware.authToken, controller.create);
routes.delete('/:id', middleware.authToken, controller.remove);
routes.put('/:id', middleware.authToken, controller.update);
routes.get('/', middleware.authToken, controller.getByUser);

module.exports = routes;
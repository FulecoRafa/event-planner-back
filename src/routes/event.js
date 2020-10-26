const routes = require('express').Router();

const middleware = require('../middleware');
const controller = require('../controller/event');

routes.post('/', middleware.authToken, controller.check, controller.create);
routes.delete('/:id', middleware.authToken, controller.remove);
routes.put('/:id', middleware.authToken, controller.check, controller.update);
routes.get('/', middleware.authToken, controller.getByUser);

module.exports = routes;
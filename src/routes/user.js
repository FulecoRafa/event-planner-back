const routes = require('express').Router();

const controller = require('../controller/user');
const middleware = require('../middleware');

routes.post('/register', middleware.encrypt, controller.register);
routes.post('/login', controller.auth, middleware.createTokens, controller.login);
routes.post('/auth', middleware.authToken, controller.checkPermission)

module.exports = routes;
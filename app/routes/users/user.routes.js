const userRoutes = require('express').Router();
const Controller = require('../../controller/users/users.controller')

userRoutes.post('/create',Controller.createUserController);
userRoutes.get('/get/:id',Controller.getUserController);
userRoutes.post('/login',Controller.loginUserController);
userRoutes.get('/getAll/:id',Controller.getAllUserController);

module.exports = userRoutes;
'use strict';

const express = require('express');
const { create, Delete, get, login,update } = require('../useCases/userController');

const router = express.router();

const auth = require('../middlewares/auth'); //auth

router.post('/login/', login.login);

router.post('/user/', [auth.verificationToken], create.createUser);

router.get('/users/', [auth.verificationToken], get.getUsers);
router.get(
  '/user/:id',
  auth.verificationToken,
  auth.verificationToken,
  get.getUser
);

router.delete(
  '/user/:id',
  [auth.verificationToken, auth.verificaRole_Admin],
  Delete.deleteUser
);

router.put('/user/:id', update.updateUser);

module.exports = router;

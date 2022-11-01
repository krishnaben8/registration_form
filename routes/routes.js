const express = require('express');
const router = express.Router();
const userController = require('../controller/user.control')


router.use('/user', userController)

module.exports = router;
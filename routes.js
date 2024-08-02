const express = require('express');
const router = express.Router();

const login = require('./src/controllers/login');

// router.get('/', home.pagInicialGet);
router.get('/Login', login.pagLoginGet);
router.get('/Logout', login.pagLogoutGet);

router.post('/', login.pagLoginPost);

module.exports = router;
const router = require('express').Router();
const { login, updatePreferredColor } = require('../controllers/user.controller');
const authJwt = require('../middlewares/auth-Jwt');

router.post('/login', login);

router.patch('/preferredcolor', authJwt, updatePreferredColor);

module.exports = router;

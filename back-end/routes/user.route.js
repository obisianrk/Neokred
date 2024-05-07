const router = require("express").Router();

const { userRegistration, userLogin, getUser } = require('../controllers/user.controller');
const { verifyToken } = require('../utils/common')

router.post('/register', userRegistration);
router.post('/login', userLogin);
router.get('/profile',verifyToken, getUser);

module.exports = router;
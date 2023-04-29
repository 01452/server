const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const exchengerController = require('../controllers/exchenger.controller');

const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.post('/latest', exchengerController.getLatest)
router.get('/status', exchengerController.getStatus)
router.post('/historical', exchengerController.getHistorical)
router.post('/currencies', exchengerController.getCurrencies)

module.exports = router

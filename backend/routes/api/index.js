const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const locationRouter = require('./location.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);


module.exports = router;

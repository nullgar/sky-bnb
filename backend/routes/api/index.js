const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const locationRouter = require('./location.js')
const reviewsRouter = require('./review.js')
const imagesRouter = require('./images.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/location', locationRouter);

router.use('/reviews', reviewsRouter);

router.use('/images', imagesRouter);





module.exports = router;

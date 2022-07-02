const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Location, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateReviews = [
    check('review')
        .notEmpty()
        .withMessage('Review cannot be empty.')
        .isLength({ max: 250})
        .withMessage('Url needs to be less than 250 characters.'),
    handleValidationErrors
];

router.get('/:locationId', asyncHandler(async function(req, res) {
    const { locationId } = req.params;
    const id = parseInt(locationId);
    const review = await Review.findAll({where: { locationId: locationId }});
    return res.json(review);
}));

router.post('/', validateReviews, asyncHandler(async function(req, res) {
    const review = await Review.create(req.body);

    return res.json(review);
}));

router.delete('/:reviewId', asyncHandler(async function(req, res) {
    const { reviewId } = req.params;
    const toDelete = parseInt(reviewId);
    await Review.destroy({where: { id: toDelete }});
    return res.json(toDelete)
}))


module.exports = router;

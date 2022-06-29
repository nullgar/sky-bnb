const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Location, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


router.get('/', asyncHandler(async function(req, res) {
    const review = await Review.findAll();
    return res.json(review);
}));

router.post('/', asyncHandler(async function(req, res) {
    const review = await Review.create(req.body);

    return res.json(review);
}));


module.exports = router;

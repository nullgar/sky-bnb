const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Location, Review, Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateImages = [
    check('url')
        .exists()
        .withMessage('Url cannot be empty.')
        .matches(/^(https:\/\/).+((.jpg)|(.jpeg)|(.png)|(.svg))$/)
        .withMessage('Url needs to end in .jpg, .jpeg, .png, or .svg.')
        .isLength({min: 3, max: 250})
        .withMessage('Url needs to be 3 - 250 characters.'),
    handleValidationErrors
];

router.get('/:locationId', asyncHandler(async function(req, res) {
    const { locationId } = req.params;
    const id = parseInt(locationId);
    const images = await Image.findAll({ where: { locationId: locationId }});
    return res.json(images);
}));

router.post('/', validateImages, asyncHandler(async function(req, res) {
    const image = await Image.create(req.body);
    return res.json(image);
}));

module.exports = router;

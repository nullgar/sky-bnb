const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Location, Review, Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


router.get('/:locationId', asyncHandler(async function(req, res) {
    const { locationId } = req.params;
    const id = parseInt(locationId);
    const images = await Image.findAll({ where: { locationId: locationId }});
    return res.json(images);
}));

router.post('/', asyncHandler(async function(req, res) {
    console.log('body request-----', req.body)
    const image = await Image.create(req.body);
    console.log('image from api to return -----------', image)
    return res.json(image);
}));

module.exports = router;

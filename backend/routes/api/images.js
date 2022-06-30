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

router.post('/:locationId', asyncHandler(async function(req, res) {
    const images = await Image.create(req.body);

    return res.json(images);
}));

module.exports = router;

const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Location } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({  checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];


router.get('/', asyncHandler(async function(req, res) {
    const locations = await Location.findAll();
    return res.json(locations);
}));


router.get(/^\/\d+/, asyncHandler(async function(req, res) {
    const id = req.path.slice(1)
    console.log(id)
    const locationId = await Location.findByPk(parseInt(id));

    return res.json(locationId);
}));

router.post(
    '/',
    asyncHandler( async (req, res) => {
        const location = await Location.create(req.body);
        console.log('hit this -----',req.baseUrl);
        res.json(`/`)
    })
);

// router.post(
//     '/',
//




module.exports = router;

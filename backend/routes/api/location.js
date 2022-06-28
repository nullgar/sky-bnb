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

    const locationId = await Location.findByPk(parseInt(id));
    return res.json(locationId);
}));

router.post(
    '/',

    asyncHandler( async (req, res) => {
        const data = await Location.create(req.body);
        res.json(data.id)
    })
);

router.put(
    '/:id',

    asyncHandler( async (req, res) => {
        const id = req.params.id;
        const location = req.body
        const updatedLocation = await Location.update(location , { where: { id: id } })

        res.json(location)
    })
)

router.delete("/:id", asyncHandler(async function (req, res) {
    const id = await Location.findByPk(req.params.id);
    await id.destroy();
    res.json(id)
}));



module.exports = router;

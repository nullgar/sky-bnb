const express = require('express');
const asyncHandler = require('express-async-handler');

const { User, Location } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// userId, name, address, city, country, price
const validateLocation = [
    check('name')
        .exists()
        .withMessage('Name cannot be empty.')
        .isLength({ min: 3, max: 100 })
        .withMessage('Name needs to be longer than 3 - 100 characters.'),
    check('address')
        .exists()
        .withMessage('Address cannot be empty.')
        .isLength({ min: 5, max: 100 })
        .withMessage('Address needs to be between 5 - 100 characters.'),
    check('price')
        .exists()
        .withMessage('Price cannot be empty.')
        .matches(/\d+/)
        .withMessage('Price needs to be a number!'),
    check('city')
        .exists()
        .withMessage('Please provide the locations City.')
        .isLength({ min: 3, max: 100 })
        .withMessage('City needs to be between 3 - 100 characters.'),
    check('country')
        .exists()
        .withMessage('Please provide the locations Country.')
        .isLength({ min: 5, max: 50 })
        .withMessage('City needs to be between 5 - 100 characters.'),
    check('price')
        .exists()
        .withMessage('Please provide a Price.'),

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
    validateLocation,
    asyncHandler(async (req, res, next) => {

        const data = await Location.create(req.body);

        res.json(data.id)
    })
);

router.put(
    '/:id',
    validateLocation,
    asyncHandler( async (req, res) => {
        const id = parseInt(req.params.id);
        const location = req.body;
        const updatedLocation = await Location.update({...location}, { where: { id: id } });

        res.json({id, location});
    })
)

router.delete("/:id", asyncHandler(async function (req, res) {
    const id = await Location.findByPk(req.params.id);
    await id.destroy();
    res.json(id)
}));



module.exports = router;

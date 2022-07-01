const express = require('express');
const asyncHandler = require('express-async-handler');

const { User, Location } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// userId, name, address, city, country, price
const validateLocation = [
    check('name')
        .custom(val => {
            return Location.findOne({where: {name: val}})
                .then(location => {
                    if (location) {
                        return Promise.reject('Name already exists.')
                    }
                });
        })
        .isLength({ min: 3 })
        .withMessage('Name needs to be longer than 3 characters.'),
    check('address')
        .custom(val => {
            return Location.findOne({where: {name: val}})
                .then(location => {
                    if (location) {
                        return Promise.reject('Location already exists')
                    }
                });
        }),
    check('price')
        .matches(/\d+/)
            .withMessage('Price needs to be a number!'),
        // .withMessage('Please provide a unique location address.'),
    // check('city')
    //     .notEmpty()
    //     .withMessage('Please provide the locations City.'),
    // check('country')
    //     .notEmpty()
    //     .withMessage('Please provide the locations Country.'),
    // check('price')
    //     .notEmpty()
    //     .withMessage('Please provide a Price.'),

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
        console.log('this is the route data ----',data)
        if (!data) {
            const err = new Error('Duplicate Address');
            err.status = 401;
            err.title = 'Duplicate Address';
            err.errors = ['The provided address is a duplicate!'];
            return next(err);
        }

        res.json(data.id)
    })
);

router.put(
    '/:id',

    asyncHandler( async (req, res) => {
        const id = parseInt(req.params.id);
        const location = req.body
        const updatedLocation = await Location.update({...location}, { where: { id: id } })

        res.json({id, location})
    })
)

router.delete("/:id", asyncHandler(async function (req, res) {
    const id = await Location.findByPk(req.params.id);
    await id.destroy();
    res.json(id)
}));



module.exports = router;

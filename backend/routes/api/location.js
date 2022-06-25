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


// router.get(
//     '/:id',
//     restoreUser,
//     (req, res) => {
//         const { user } = req;
//         if (user) {
//             return res.json({
//                 user: user.toSafeObject()
//             });
//         } else return res.json({});
//     }
// );
router.get('/', asyncHandler(async function(req, res) {
    const locations = await Location.findAll();
    return res.json(locations);
}));
// router.get('/', asyncHandler(async function(req, res) {
//     const location = await Locations.one(req.params.id);
//     return res.json(location);
// }));

router.get('/:id', asyncHandler(async function(req, res) {
    const locationId = await Location.findByPk(req.params.id);
    return res.json(locationId);
}));

// router.post(
//     '/',
//     validateLogin,
//     asyncHandler(async (req, res, next) => {
//       const { credential, password } = req.body;

//       const user = await User.login({ credential, password });

//       if (!user) {
//         const err = new Error('Login failed');
//         err.status = 401;
//         err.title = 'Login failed';
//         err.errors = ['The provided credentials were invalid.'];
//         return next(err);
//       }

//       await setTokenCookie(res, user);

//       return res.json({
//         user
//       });
//     })
// );


router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'sucess' })
    }
);
module.exports = router;

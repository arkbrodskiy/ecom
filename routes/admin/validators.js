const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            const existingUser = await usersRepo.getOneBy({email})
            if (existingUser) {
                throw new Error('Email in use');
            }
        }),
    requirePassword: check('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Must be between 4 and 20 characters'),
    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .custom((passwordConfirmation, { req }) => {
            console.log("password is: ", req.body.password);
            console.log("password confirmation is: ", passwordConfirmation);
            if (passwordConfirmation !== req.body.password) {
                throw new Error('Password and password confirmation must match');
            } else console.log("Password and password confirmation matched - no errors found");
        })
};
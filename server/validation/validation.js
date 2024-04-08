const { check, body } = require("express-validator");
const User = require("../models/user");

exports.validRegister = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email!")
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then((user) => {
                if (user) {
                    throw new Error(
                        "Email exists already, please pick a different one!"
                    );
                    // return Promise.reject(
                    //     "Email exists already, please pick a different one!"
                    // );
                }
            });
        })
        .normalizeEmail(),
    body(
        "password",
        "Please enter a password with only numbers and text, and at least 5 characters!"
    )
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim(),
    body("confirmPassword")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error("Password have to match");
            }
            return true;
        }),
];

exports.validLogin = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then((user) => {
                if (!user) {
                    throw new Error("User cannot found!");
                }
            });
        })
        .normalizeEmail(),
    body(
        "password",
        "Please enter a password with only numbers and text, and at least 5 characters!"
    )
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim(),
];

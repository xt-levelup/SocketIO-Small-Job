const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    expires: {
        type: Date,
        required: false,
    },
    session: {
        cookie: {},
        isLoggin: Boolean,
        user: {},
    },
});

module.exports = mongoose.model("Session", sessionSchema);

const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);

const mongoDBUrl =
    "mongodb+srv://xitrumvndn:2991981DBok@cluster0.uhljnwm.mongodb.net/shop?retryWrites=true&w=majority";

const sessionStore = new mongoDBStore({
    uri: mongoDBUrl,
    collection: "sessions",
});

module.exports = sessionStore;

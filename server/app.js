const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const sessionStore = require("./store/sessionDB");
const session = require("express-session");
// const mongoDBStore = require("connect-mongodb-session")(session);

const flash = require("connect-flash");

const User = require("./models/user");

const mongoDBUrl =
    "mongodb+srv://xitrumvndn:2991981DBok@cluster0.uhljnwm.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();

// const sessionStore = new mongoDBStore({
//     uri: mongoDBUrl,
//     collection: "sessions",
// });

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(
    session({
        secret: "my-secret",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);

app.use(cors());

app.use(bodyParser.json());

app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
        });
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

mongoose
    .connect(mongoDBUrl)
    .then((result) => {
        console.log("Connected!");
        const server=app.listen(5000);
        const io=require("./socket").init(server,{
            cors:{
                origin:"*"
            }
        });
        io.on("connection",(socket)=>{
            console.log("Client  connected!");
        });
    })
    .catch((err) => {
        console.log(err);
    });

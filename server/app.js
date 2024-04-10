require("dotenv").config();
const path = require("path");
const fs = require("fs");
const https = require("https");

const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const sessionStore = require("./store/sessionDB");
const session = require("express-session");
// const mongoDBStore = require("connect-mongodb-session")(session);

const compression = require("compression");
const morgan = require("morgan");

const flash = require("connect-flash");

const User = require("./models/user");

const mongoDBUrl = process.env.MONGO_URL;

const app = express();

const privateKey = fs.readFileSync("server.key");
const certificate = fs.readFileSync("server.cert");

// console.log("PORT:",PORT);
// console.log("process.env.MONGO_USER:", process.env.MONGO_USER);
// console.log("process.env.MONGO_PASSWORD:", process.env.MONGO_PASSWORD);
// console.log("process.env.MONGO_URL:", process.env.MONGO_URL);
// console.log("mongoDBUrl:", mongoDBUrl);

// const sessionStore = new mongoDBStore({
//     uri: mongoDBUrl,
//     collection: "sessions",
// });

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

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
    // const server = https
    //   .createServer(
    //     {
    //       key: privateKey,
    //       cert: certificate,
    //     },
    //     app
    //   )
    //   .listen(process.env.PORT || 5000);
    const server = app.listen(process.env.PORT || 5000);
    // const server=app.listen(5000);
    const io = require("./socket").init(server, {
      cors: {
        origin: "*",
      },
    });
    io.on("connection", (socket) => {
      console.log("Client  connected!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

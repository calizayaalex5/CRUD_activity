const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config(); //carga mis variables en .env

const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const port = process.env.PORT || 3000;

//conexion a mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB", err));

//middleware
app.use(express.json());
app.use(cors());

//configuracion de salida
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true
    }
}))

//conexion con el passport
app.use(passport.initialize());
app.use(passport.session());

//conexion con github
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || "https://crud-activity.onrender.com/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

//serializacion 
//get the data from the user
passport.serializeUser((user, done) => {
    done(null, user);
});

//deserializacion
//search the user in the database
passport.deserializeUser((user, done) => {
    done(null, user);
});

//rutas de autenticacion
app.get("/login", passport.authenticate('github', { scope: ['user:email'] }));

app.get("/logout", function (req, res, next) {
    req.logOut(function (err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

app.get("/github/callback",
    passport.authenticate("github", { failureRedirect: '/api-docs' }),
    function (req, res) {
        res.redirect("/api-docs");
    }
)

//conexion a rutas
app.use('/', require('./routes'))

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
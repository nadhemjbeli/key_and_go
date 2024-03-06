// Importation des dépendances
const express = require('express');
require('dotenv').config();
let cors = require('cors');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const connection = require("./db/db");
const userRoute = require("./Routers/User/UserRoute")
const keyComment = require("./Routers/User/CommentKeyRoute")
const annonce = require("./Routers/User/announce/AnnounceRoute")
const evennement = require("./Routers/User/announce/EvennementRoute")
const userAdminRoute = require("./Routers/UserAdmin/UserAdminRoute")
const vehicleKeyAdmin = require("./Routers/UserAdmin/VehicleKeyAdminRoute")
const annonceAdmin = require("./Routers/UserAdmin/AnnounceAdminRoute")
const subscriptionRoute = require("./Routers/User/SubscriptionRoute")
const googleAuth = require("./Routers/User/google-auth")
const facebookRouter = require("./Routers/User/facebook-auth")
// const { LocalStorage } = require('node-localstorage');
//
// // Create an instance of LocalStorage with a specific directory (or path)
// const localStorage = new LocalStorage('./scratch');

const app = express();
app.use(cookieParser());
//? reception et envoie de données avec le format json
app.use(cors({
    origin: [process.env.FRONT_URI],
    credentials: true,
}));
//database connection
connection();
// Configure session middleware
// const store = new MongoDBStore({
//     uri: process.env.URL,
//     collection: 'sessions'
// });



app.use(
    session({
        secret: process.env.PK,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
const PORT = process.env.PORT || 4000; // Choisissez le port souhaité

// Configuration des routes
// Exemple de route de base






app.use('/uploads', express.static('uploads'));

app.use("/", userRoute)
app.use('/auth/google', googleAuth);
app.use('/auth/facebook', facebookRouter);
app.use("/admin/user", userAdminRoute)
app.use("/sub", subscriptionRoute)
app.use("/admin/key", vehicleKeyAdmin)
app.use("/admin/annonce", annonceAdmin)
app.use("/api/annonce", annonce)
app.use("/api/event", evennement)
app.use("/comment", keyComment)

app.get('/', (req, res) => {
    return new Promise((resolve, reject)=>{

        resolve("message")
    }).then((d)=>{
        console.log(d)
        // localStorage.setItem("mail", "mail")
        res.send('Bienvenue sur votre serveur !');
    })


});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur le port ${PORT}`);
});
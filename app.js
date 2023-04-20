// Eda Ekeyilmaz -8823564
// Namitha Chevari - 8817006

import express from 'express'
import session from 'express-session'
import router from "./routes/web.js";
import MongoStore from 'connect-mongo'

import bodyParser from 'body-parser'
import mongooseConnection from './db.js';

const HTTP_PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

const uri = "mongodb+srv://eekeyilmaz:Eda123@cluster0.wmufeqn.mongodb.net/DriveTestDb?retryWrites=true&w=majority";
const store = new MongoStore({
    mongoUrl: uri,
    dbName : "DriveTestDb",
    collectionName: 'mysession'
});

app.use(session({
    secret: 'A Secret Key to Sign the Cookie',
    resave: false,
    saveUninitialized: false,
    store: store,
}));

app.use(express.urlencoded({extended:true}))



app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({     
    limit: '200mb',
    extended: true
}));

mongooseConnection();

global.loggedIn = null;
global.userType = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.isFoundInDb;
    userType = req.session.userType;
    next()
});


app.listen(HTTP_PORT, () => {
    console.log(`App is listening at port ${HTTP_PORT}!`);
});

app.use('/',router)



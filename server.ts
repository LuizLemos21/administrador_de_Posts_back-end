import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './routes';
import session from 'express-session';
import passport from 'passport';
import './strategies/twitterStrategy';
import './strategies/facebookStrategy';
import './strategies/linkedinStrategy';
import './strategies/instagramStrategy';
import bodyParser from 'body-parser';

console.log('Main server file loaded'); 

const morgan = require('morgan');


const app = express();


// Configure session middleware
const secret = process.env.JWT_SECRET as string;
app.use(session({
  secret: secret, // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());



const port = 3000;
const cors = require('cors');
app.use(cors());  // This will enable CORS for all routes and origins

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(morgan('dev'));
app.use(router);


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj: any, done: (err: any, user: any | null) => void) => done(null, obj));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

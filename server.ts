import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import router from './routes';
import session from 'express-session';
import passport from 'passport';
import './strategies/twitterStrategy';
import './strategies/facebookStrategy';
import './strategies/linkedinStrategy';
import './strategies/instagramStrategy';
import bodyParser from 'body-parser';

dotenv.config();
console.log('Main server file loaded'); 

const morgan = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const secret = process.env.JWT_SECRET as string;
app.use(session({
  secret: secret, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

const port = 3000;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj: any, done: (err: any, user: any | null) => void) => done(null, obj));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID as string;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET as string;

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const userId = profile.id;
    const username = profile.displayName;
    const socialNetwork = 'facebook';

    const user = { id: userId, username, accessToken, profile };

    // Save user data to the database via API call
    const response = await axios.post(`http://localhost:3000/api/${userId}`, {
      userId,
      username,
      accessToken,
      socialNetwork
    });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

import passport from 'passport';
import { Strategy as FacebookStrategy, Profile } from 'passport-facebook';
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
<<<<<<< Updated upstream
async (accessToken, refreshToken, profile, done) => {
=======
async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
>>>>>>> Stashed changes
  try {
    console.log("Profile:", profile);
    console.log("Access Token:", accessToken);

    const userId = profile.id;
    const username = profile.displayName;
    const socialNetwork = 'facebook';

    const user = { id: userId, username, accessToken, profile };

    const response = await axios.post(`http://localhost:3000/api/storeUserData`, {
      userId,
      username,
      accessToken,
      socialNetwork
    });

    return done(null, user);
  } catch (error) {
<<<<<<< Updated upstream
=======
    console.error("An error occurred during the Facebook login callback:", error);
>>>>>>> Stashed changes
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

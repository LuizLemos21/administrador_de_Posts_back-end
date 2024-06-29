import passport from 'passport';
import { Strategy as InstagramStrategy } from 'passport-instagram';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID as string;
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET as string;

passport.use(new InstagramStrategy({
  clientID: INSTAGRAM_CLIENT_ID,
  clientSecret: INSTAGRAM_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/instagram/callback",
},
async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
  try {
    const userId = profile.id;
    const username = profile.username;
    const socialNetwork = 'instagram';

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

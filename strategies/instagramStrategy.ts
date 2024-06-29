import passport from 'passport';
<<<<<<< Updated upstream
import { Strategy as InstagramStrategy } from 'passport-instagram';
=======
import { Strategy as InstagramStrategy, Profile } from 'passport-instagram';
>>>>>>> Stashed changes
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID as string;
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET as string;

passport.use(new InstagramStrategy({
  clientID: INSTAGRAM_CLIENT_ID,
  clientSecret: INSTAGRAM_CLIENT_SECRET,
<<<<<<< Updated upstream
  callbackURL: "http://localhost:3000/auth/instagram/callback",
},
async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
  try {
    const userId = profile.id;
    const username = profile.username;
=======
  callbackURL: "http://localhost:3000/auth/instagram/callback"
},
async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
  try {
    console.log("Profile:", profile);
    console.log("Access Token:", accessToken);

    const userId = profile.id;
    const username = profile.displayName;
>>>>>>> Stashed changes
    const socialNetwork = 'instagram';

    const user = { id: userId, username, accessToken, profile };

<<<<<<< Updated upstream
    // Save user data to the database via API call
    const response = await axios.post(`http://localhost:3000/api/${userId}`, {
=======
    const response = await axios.post(`http://localhost:3000/api/storeUserData`, {
>>>>>>> Stashed changes
      userId,
      username,
      accessToken,
      socialNetwork
    });
<<<<<<< Updated upstream

    return done(null, user);
  } catch (error) {
=======
    console.log("API Response:", response.data);

    return done(null, user);
  } catch (error) {
    console.error("An error occurred during the Instagram login callback:", error);
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

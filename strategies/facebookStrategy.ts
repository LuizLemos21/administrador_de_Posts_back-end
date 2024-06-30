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
  profileFields: ['id', 'emails', 'name'],
  passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
  console.log("User ID from session:", req.session.userId);
  console.log("Facebook Profile:", profile);

  try {
    let username = profile.displayName;

    if (!username && profile.name) {
      username = `${profile.name.givenName} ${profile.name.familyName}`;
    }

    if (!username) {
      username = 'Unknown User';
    }

    const userId = req.session.userId;
    if (!userId) {
      throw new Error('User ID is missing in the session.');
    }

    const socialNetwork = 'facebook';
    const user = { id: userId, username, socialNetwork, accessToken, profile };

    const requestData = {
      nome: username,
      endpoint: 'https://graph.facebook.com/v12.0/me/feed',
      userId,
      accessToken,
      socialNetwork
    };

    console.log("Extracted userId:", userId);
    console.log("Request Data:", requestData);

    const response = await axios.post(`http://localhost:3000/api/users`, requestData);
    console.log("API Response:", response.data);

    return done(null, user);
  } catch (error) {
    console.error("An error occurred while processing the Facebook login callback.");
    if (axios.isAxiosError(error)) {
      console.error("Axios error response data:", error.response?.data);
      console.error("Axios error response status:", error.response?.status);
      console.error("Axios error response headers:", error.response?.headers);
    } else if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    } else {
      console.error("Unexpected error:", error);
    }
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY as string;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET as string;

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:3000/auth/twitter/callback",
  passReqToCallback: true
},
async (req, token, tokenSecret, profile, done) => {
  console.log("User ID from session:", req.query.userId);
  console.log("Twitter Profile:", profile);

  try {
    let username = profile.displayName;

    if (!username && profile.username) {
      username = profile.username;
    }

    if (!username) {
      username = 'Unknown User'; // Fallback in case displayName and username are undefined
    }

    const userId = req.session.userId as string;
    if (!userId) {
      throw new Error('User ID is missing in the session.');
    }

    const socialNetwork = 'twitter';
    const user = { id: userId, username, socialNetwork, accessToken: token, profile };

    const requestData = {
      nome: username,
      endpoint: 'https://api.twitter.com/2/tweets',
      userId, // Ensure this is correctly named according to your database schema
      accessToken: token,
      socialNetwork
    };

    console.log("Extracted userId:", userId);
    console.log("Request Data:", requestData);

    // Save user data to the database via API call
    const response = await axios.post(`http://localhost:3000/api/users`, requestData);
    console.log("API Response:", response.data);

    return done(null, user);
  } catch (error) {
    console.error("An error occurred while processing the Twitter login callback.");
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

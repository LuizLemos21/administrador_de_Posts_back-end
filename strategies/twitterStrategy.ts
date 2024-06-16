import passport from 'passport';
import { Strategy as TwitterStrategy, Profile } from 'passport-twitter';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY as string;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET as string;

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:3000/auth/twitter/callback"
},
async function(token: string, tokenSecret: string, profile: Profile, done: (error: any, user?: any) => void) {
  try {
    console.log("Profile:", profile);
    console.log("Token:", token);
    console.log("Token Secret:", tokenSecret);

    const userId = profile.id;
    const username = localStorage.getItem('username');
    const endpoint = localStorage.getItem('socialEndpoint');
    const socialNetwork = 'twitter';

    const response = await axios.post(`http://localhost:3000/api/${userId}`, {
      username: username,
      endpoint: endpoint,
      userId: userId,
      accessToken: token,
      socialNetwork: socialNetwork
    });
    console.log("API Response:", response.data);
    return done(null, { profile, token, tokenSecret });
  } catch (error) {
    console.error("API Error:", error);
    return done(error);
  }
}));

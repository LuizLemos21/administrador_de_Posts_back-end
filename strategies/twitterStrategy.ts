import passport from 'passport';
import { Strategy as TwitterStrategy, Profile } from 'passport-twitter';
import dotenv from 'dotenv';

dotenv.config();

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY as string;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET as string;

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:3000/auth/twitter/callback",
  includeEmail: true
},
async (token: string, tokenSecret: string, profile: Profile, done: (error: any, user?: any) => void) => {
  try {
    const userId = profile.id;
    const username = profile.username;
    const socialNetwork = 'twitter';

    const user = { id: userId, username, token, tokenSecret, profile };

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

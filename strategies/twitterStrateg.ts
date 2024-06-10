import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // Save tokens in your database here
    return done(null, { profile, token, tokenSecret });
  }
));

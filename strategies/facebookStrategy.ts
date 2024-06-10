import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import axios from 'axios';

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    const userId = profile.id; // Use profile.id as userId or your own logic
    const username = profile.username; // Use profile.username or your own logic
    const endpoint = 'https://api.twitter.com'; // Twitter API endpoint

    axios.post(`http://localhost:3000/api/${userId}`, {
      username: username,
      endpoint: endpoint,
      userId: userId,
      accessToken: token,
      socialNetwork: 'Twitter'
    }).then(() => {
      return done(null, { profile, token, tokenSecret });
    }).catch((error) => {
      return done(error);
    });
  }
));

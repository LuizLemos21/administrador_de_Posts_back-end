import passport from 'passport';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import axios from 'axios';

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social']
  },
  function(accessToken, refreshToken, profile, done) {
    const userId = profile.id; // Use profile.id as userId or your own logic
    const username = profile.displayName; // Use profile.displayName or your own logic
    const endpoint = 'https://api.linkedin.com'; // LinkedIn API endpoint

    axios.post(`http://localhost:3000/api/${userId}`, {
      username: username,
      endpoint: endpoint,
      userId: userId,
      accessToken: accessToken,
      socialNetwork: 'LinkedIn'
    }).then(() => {
      return done(null, { profile, accessToken });
    }).catch((error) => {
      return done(error);
    });
  }
));

import passport from 'passport';
import { Strategy as FacebookStrategy, Profile } from 'passport-facebook';
import axios from 'axios';

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID as string;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET as string;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  async function(accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) {
    const userId = profile.id;
    const username = localStorage.getItem('username');
    const endpoint = localStorage.getItem('socialEndpoint');
    const socialNetwork = 'facebook';
    try {
      await axios.post(`http://localhost:3000/api/${userId}`, {
        username: username,
        endpoint: endpoint,
        userId: userId,
        accessToken: accessToken,
        socialNetwork: socialNetwork
      });
      return done(null, { profile, accessToken });
    } catch (error) {
      return done(error);
    }
  }
));

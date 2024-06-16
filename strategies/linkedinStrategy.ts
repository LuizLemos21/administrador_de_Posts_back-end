import passport from 'passport';
import { Strategy as LinkedInStrategy, Profile } from 'passport-linkedin-oauth2';
import axios from 'axios';

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID as string;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string;

passport.use(new LinkedInStrategy({
    clientID: LINKEDIN_CLIENT_ID,
    clientSecret: LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social']
  },
  async function(accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) {
    const userId = profile.id;
    const username = localStorage.getItem('username');
    const endpoint = localStorage.getItem('socialEndpoint');
    const socialNetwork = 'linkedin';
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

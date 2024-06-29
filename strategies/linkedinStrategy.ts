import passport from 'passport';
import { Strategy as LinkedInStrategy, StrategyOptionWithRequest, VerifyFunctionWithRequest } from 'passport-linkedin-oauth2';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID as string;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string;

const linkedInStrategyOptions: StrategyOptionWithRequest & { state: boolean } = {
  clientID: LINKEDIN_CLIENT_ID,
  clientSecret: LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
  passReqToCallback: true,
  state: true
};

const linkedInVerify: VerifyFunctionWithRequest = async (req, accessToken, refreshToken, profile, done) => {
  try {
    const userId = profile.id;
    const username = profile.displayName;
    const socialNetwork = 'linkedin';

    const user = { id: userId, username, accessToken, profile };

    // Save user data to the database via API call
    const response = await axios.post(`http://localhost:3000/api/${userId}`, {
      userId,
      username,
      accessToken,
      socialNetwork
    });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

passport.use(new LinkedInStrategy(linkedInStrategyOptions, linkedInVerify));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

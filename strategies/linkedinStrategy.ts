import passport from 'passport';
import { Strategy as LinkedInStrategy, Profile } from 'passport-linkedin-oauth2';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID as string;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string;

passport.use(new LinkedInStrategy({
  clientID: LINKEDIN_CLIENT_ID,
  clientSecret: LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
<<<<<<< Updated upstream
  passReqToCallback: true,
  state: true
};

const linkedInVerify: VerifyFunctionWithRequest = async (req, accessToken, refreshToken, profile, done) => {
=======
},
async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
>>>>>>> Stashed changes
  try {
    console.log("Profile:", profile);
    console.log("Access Token:", accessToken);

    const userId = profile.id;
    const username = profile.displayName;
    const socialNetwork = 'linkedin';

    const user = { id: userId, username, accessToken, profile };

    const response = await axios.post(`http://localhost:3000/api/storeUserData`, {
      userId,
      username,
      accessToken,
      socialNetwork
    });

    return done(null, user);
  } catch (error) {
<<<<<<< Updated upstream
=======
    console.error("An error occurred during the LinkedIn login callback:", error);
>>>>>>> Stashed changes
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

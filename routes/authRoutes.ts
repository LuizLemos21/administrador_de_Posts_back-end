import express from 'express';
import passport from 'passport';
import { APIRedeSocialController } from '../controllers/apiredesocialController'; // Adjust path if necessary

const router = express.Router();
const apiRedeSocialController = new APIRedeSocialController();

// Type guard to assert req.user is of the expected type
function isUser(user: any): user is { id: string; username: string; token: string } {
    return user && typeof user.id === 'string' && typeof user.username === 'string' && typeof user.token === 'string';
  }
  
  // Endpoint to get Twitter auth URL
  router.get('/auth/twitter', (req, res, next) => {
    passport.authenticate('twitter')(req, res, next);
  });
  
  // Endpoint to handle Twitter callback and redirect
  router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
    console.log("Twitter callback called");
    if (isUser(req.user)) {
      const userData = {
        userId: req.user.id,
        username: req.user.username,
        accessToken: req.user.token,
        socialNetwork: 'twitter'
      };
      res.redirect(`/api/storeUserData?userId=${userData.userId}&username=${userData.username}&accessToken=${userData.accessToken}&socialNetwork=${userData.socialNetwork}`);
    } else {
      res.status(500).send('User data not available');
    }
  });

// Endpoint to get Facebook auth URL
router.get('/auth/facebook', passport.authenticate('facebook'));

// Endpoint to handle Facebook callback and redirect
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  if (isUser(req.user)) {
    const userData = {
      userId: req.user.id,
      username: req.user.username,
      accessToken: req.user.token,
      socialNetwork: 'facebook'
    };
    res.redirect(`/api/storeUserData?userId=${userData.userId}&username=${userData.username}&accessToken=${userData.accessToken}&socialNetwork=${userData.socialNetwork}`);
  } else {
    res.status(500).send('User data not available');
  }
});

// Endpoint to get LinkedIn auth URL
router.get('/auth/linkedin', passport.authenticate('linkedin'));

// Endpoint to handle LinkedIn callback and redirect
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => {
  if (isUser(req.user)) {
    const userData = {
      userId: req.user.id,
      username: req.user.username,
      accessToken: req.user.token,
      socialNetwork: 'linkedin'
    };
    res.redirect(`/api/storeUserData?userId=${userData.userId}&username=${userData.username}&accessToken=${userData.accessToken}&socialNetwork=${userData.socialNetwork}`);
  } else {
    res.status(500).send('User data not available');
  }
});

router.post('/api/storeUserData', apiRedeSocialController.storeUserData);

export default router;

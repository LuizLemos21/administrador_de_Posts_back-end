import express from 'express';
import passport from 'passport';
import { Request, Response } from 'express';
import '../strategies/twitterStrategy'; 


import { APIRedeSocialController } from '../controllers/apiredesocialController'; // Adjust path if necessary

const router = express.Router();
const apiRedeSocialController = new APIRedeSocialController();

// Type guard to assert req.user is of the expected type
function isUser(user: any): user is { id: string; username: string; token: string } {
    return user && typeof user.id === 'string' && typeof user.username === 'string' && typeof user.token === 'string';
  }
  
 // Endpoint to get Twitter auth URL
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
  if (req.user) {
    // Extract user data from req.user
    const user = req.user as any;
    const { token, tokenSecret } = user;
    // Redirect to a frontend route with tokens in query params
    res.redirect(`/auth/success?token=${token}&tokenSecret=${tokenSecret}`);
  } else {
    res.status(500).send('User data not available');
  }
});


router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  if (req.user) {
    res.redirect('/dashboard');
  } else {
    res.status(500).send('User data not available');
  }
});

router.get('/auth/linkedin', passport.authenticate('linkedin'));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => {
  if (req.user) {
    res.redirect('/dashboard');
  } else {
    res.status(500).send('User data not available');
  }
});


export default router;

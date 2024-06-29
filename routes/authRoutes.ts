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
  
 //Twitter Routes
 router.get('/auth/twitter', passport.authenticate('twitter'));

 router.get('/auth/twitter/callback',
   passport.authenticate('twitter', { failureRedirect: '/' }),
   (req, res) => {
     // Successful authentication
     res.redirect('/');
   });

// Facebook Routes
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/');
  });


//Linkedin Routes
  router.get('/auth/linkedin', passport.authenticate('linkedin'));

  router.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/' }),
    (req, res) => {
      // Successful authentication
      res.redirect('/');
    });

//Instagram Routes

router.get('/auth/instagram', passport.authenticate('instagram'));
router.get('/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/');
  });

export default router;

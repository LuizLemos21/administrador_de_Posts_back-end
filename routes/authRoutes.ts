import express from 'express';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import '../strategies/twitterStrategy'; 
import session from 'express-session';
import dotenv from 'dotenv';



dotenv.config();

import { APIRedeSocialController } from '../controllers/apiredesocialController'; // Adjust path if necessary

const router = express.Router();
const apiRedeSocialController = new APIRedeSocialController();

// Type guard to assert req.user is of the expected type
function isUser(user: any): user is { id: string; username: string; token: string } {
    return user && typeof user.id === 'string' && typeof user.username === 'string' && typeof user.token === 'string';
  }

  // Use express-session middleware to enable session handling
  const secret = process.env.JWT_SECRET as string;
router.use(session({
  secret: secret, // Replace with a secure secret key
  resave: false,
  saveUninitialized: true
}));
  
 //Twitter Routes
 router.get('/auth/twitter', passport.authenticate('twitter'));

 router.get('/auth/twitter/callback',
   passport.authenticate('twitter', { failureRedirect: '/' }),
   (req, res) => {
     // Successful authentication
     res.redirect('/');
   });

// Facebook Routes
router.get('/auth/facebook', (req, res, next) => {
  const userId = req.query.userId as string;
  if (!userId) {
      return res.status(400).send('User ID is required');
  }
  // Store userId in session to be used in the callback
  req.session.userId = userId;
  next();
}, passport.authenticate('facebook'));

router.get('/auth/facebook/callback', (req: Request, res: Response, next) => {
  passport.authenticate('facebook', (err: any, user: any, info: any) => {
      if (err) {
          return next(err);
      }
      if (!user) {
          return res.redirect('/');
      }
      req.logIn(user, (err: any) => {
          if (err) {
              return next(err);
          }
          return res.redirect('/'); // Redirect to a desired route after successful login
      });
  })(req, res, next);
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

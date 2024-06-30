import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import session from 'express-session';
import '../strategies/twitterStrategy';
import '../strategies/facebookStrategy';
import { APIRedeSocialController } from '../controllers/apiredesocialController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();
const apiRedeSocialController = new APIRedeSocialController();

// Use express-session middleware to enable session handling
const JWT_SECRET = process.env.JWT_SECRET as string;
router.use(session({
    secret: JWT_SECRET, // Replace with a secure secret key
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the session
router.use(passport.initialize());
router.use(passport.session());

// Type guard to assert req.user is of the expected type
function isUser(user: any): user is { id: string; username: string; token: string } {
    return user && typeof user.id === 'string' && typeof user.username === 'string' && typeof user.token === 'string';
}

// Twitter Routes
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/');
    });

// Facebook Routes
router.get('/auth/facebook', (req: Request, res: Response, next: NextFunction) => {
    const userId = req.query.userId as string;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    // Store userId in session to be used in the callback
    req.session.userId = userId;
    next();
}, passport.authenticate('facebook'));

router.get('/auth/facebook/callback', (req: Request, res: Response, next: NextFunction) => {
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

// LinkedIn Routes
router.get('/auth/linkedin', passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/');
    });

// Instagram Routes
router.get('/auth/instagram', passport.authenticate('instagram'));

router.get('/auth/instagram/callback',
    passport.authenticate('instagram', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/');
    });

export default router;

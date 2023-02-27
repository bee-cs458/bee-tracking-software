import express from 'express';
import passport from "passport";

const router = express.Router();

/**
 * Local Login - Also Known As login with a Username and Password
 */
router.post(
    "/",
    passport.authenticate("local", {
        successRedirect: "/api/login/success",
        failureRedirect: "/api/login/failure",
    })
);

/**
 * Google Login
 */
router.get('/google',
  passport.authenticate("google", { scope: [ 'email', 'profile' ]
}));
router.get('/google/callback', passport.authenticate( 'google', {
   successRedirect: '/api/login/success',
   failureRedirect: '/api/login/failure'
}));

// logout
router.post('/logout', async (req, res, next) => {
    await req.logout().then(res.send("Logged out")).catch(next);
});

router.get("/success", (req, res) => {
    delete req.user?.password;
    res.send(req.user);
});

router.get("/failure", (req, res) =>
    res.status(401).send("authentication failure")
);

export default router;
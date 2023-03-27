import express from "express";
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
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/api/login/failure",
  })
);

// logout
router.post("/logout", async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("Logged Out");
  });
});

// Retrieves the information of the currently autheticated user, if there is one
// Return a status of 204 if there is no authenticated user
router.get("/success", (req, res) => {
  // If a user exists
  if (req.user) {
    // Make sure the password is deleted from the user data stored in the session
    delete req.user?.password;
    // Send the user data to the front end
    res.status(200).json({
      user: req.user,
    });
  } else {
    // return a 204 code if there is no user authenticated
    res.status(204).json({
      message: "No user currently authenticated",
    });
  }
});

router.get("/failure", (req, res) =>
  res.status(401).send("authentication failure")
);

export default router;

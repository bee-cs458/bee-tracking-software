import passport from "passport";
import { query } from "./DatabaseUtilities.js";
import { StrategyImplementation as googleAuth } from "./passport-google-auth.js";
import { StrategyImplementation as localAuth } from "./passport-local-auth.js";

passport.use(googleAuth);
passport.use(localAuth);

passport.serializeUser((user, done) => done(null, user));

const findUser = (user_id) => query("SELECT * FROM `user` WHERE `user`.`user_id` = ?", [user_id]);
const matchUserEmail = (email) => query("SELECT * FROM `user` WHERE `user`.`email` = ?", [email]);

passport.deserializeUser((user, done) => {
    // If the user information we recieve is a google user, then search for the BEETS account
    // using the Google account email
    if (user?.provider == "google") {

        // Query the database to match the google account to a BEETS account (using their email)
        matchUserEmail(user?.emails[0].value).then(
            // If a BEETS account is found, returns that BEETS account data
            (result) => done(null, result[0]),
            // If one is not found, return an error
            // TODO: create a new account and associate it with the google account
            //  by setting the email equal to the email in the google account
            (err) => done(err),
        )

        // If the user information we recieve is not a Google user, then it is a regular
        // BEETS account - proceed with getting the user data from the DB as normal
    } else {
        console.log("login local");
        findUser(user.user_id).then(
            (result) => done(null, result[0]),
            (err) => done(err),
        )
    }

});

export default passport;
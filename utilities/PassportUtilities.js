import passport from "passport";
import { query } from "./DatabaseUtilities.js";
import { StrategyImplementation as googleAuth } from "./passport-google-auth.js";
import { StrategyImplementation as localAuth } from "./passport-local-auth.js";

passport.use(googleAuth);
passport.use(localAuth);


passport.serializeUser((user, done) => done(null, user));

const FindUserQuery = (user_id) => query("SELECT * FROM `user` WHERE `user`.`user_id` = ?", [user_id]);

passport.deserializeUser((user, done) => {
    if (user?.provider == "google") {

        // In here, we need to query the database for a link between the google account 
        // and a BEETS user

        // If there is a BEETS user associated with the google account, we return that user information from the DB

        // If there is not a BEETS account, we create one, then return that new user

        console.log("login google");
        done(null, user);
    } else {
        console.log("login local");
        FindUserQuery(user.user_id).then(
            (result) => done(null, result[0]),
            (err) => done(err),
        )
    }

});
// passport.deserializeUser((user_id, done) => FindUserQuery(user_id).then(
// (result) => done(null, result[0]),
// (err) => done(err)
// ));

export default passport;
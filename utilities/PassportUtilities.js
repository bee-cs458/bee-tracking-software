import passport from "passport";
import { query } from "./DatabaseUtilities.js";
import { StrategyImplementation as googleAuth } from "./passport-google-auth.js";
import { StrategyImplementation as localAuth } from "./passport-local-auth.js";

passport.use(googleAuth);
passport.use(localAuth);

const findUser = (user_id) => query("SELECT * FROM `user` WHERE `user`.`user_id` = ?", [user_id]);
const matchUserEmail = (email) => query("SELECT * FROM `user` WHERE `user`.`email` = ?", [email]);
const createUser = (user) => query(`INSERT INTO user (user_id, first_name, last_name, strikes, permissions, advanced, email)
VALUES('${user.id.slice(0, 6)}', '${user.name.givenName}', '${user.name.familyName}', 0, 0, 0, '${user.emails[0].value}');`);

passport.serializeUser((user, done) => {
    // If the user information we recieve is a google user, then search for the BEETS account
    // using the Google account email
    if (user?.provider == "google") {
        console.log("Google Auth")
        // Query the database to match the google account to a BEETS account (using their email)
        matchUserEmail(user?.emails[0].value).then(
            // If a BEETS account is not found, create a new account
            (result) => {
                if (result[0] === undefined) {
                    createUser(user)
                        .then(
                            (result) => {
                                matchUserEmail(user.emails[0].value).then(
                                    (result) => {
                                        delete result[0].password;
                                        done(null, result[0]);
                                    }
                                )
                            }
                        )
                } else {
                    console.log("account found");
                    // If a BEETS account is found, return that user information
                    done(null, result[0]);
                }

            },
            (err) => {
                console.err(err);
            },
        )

        // If the user information we recieve is not a Google user, then it is a regular
        // BEETS account - proceed with getting the user data from the DB as normal
    } else {
        console.log("Local Auth")
        findUser(user.user_id).then(
            (result) => {
                done(null, result[0])
            },
            (err) => done(err),
        )
    }


});

passport.deserializeUser((user, done) => {
    done(null, user)
});

export default passport;
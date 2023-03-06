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
        console.log("Attempting to login with Google");
        // Query the database to match the google account to a BEETS account (using their email)
        matchUserEmail(user?.emails[0].value).then(
            // If a BEETS account is found, returns that BEETS account data
            (result) => {
                console.log("++++Google Auth Debug Info - Send to Cody++++")
                console.log("USER: " + JSON.stringify(user))
                console.log("RESULT: " + JSON.stringify(result[0]));
                console.log("+++++++++++++++++++++++++++++++++++++++++++++")

                if (result[0] === undefined) {
                    console.log("Unable to match user - attempting to create new BEETS account")
                    query(`INSERT INTO user (user_id, first_name, last_name, strikes, permissions, advanced, email)
                    VALUES('${user.id.slice(0, 6)}', '${user.name.givenName}', '${user.name.familyName}', 0, 0, 0, '${user.emails[0].value}');`)
                    .then(matchUserEmail(user?.emails[0].value)
                        .then(
                            (result) => done(null, result[0]),
                            (err) => done(err),
                        )
                    )
                }
            },
            // If one is not found, return an error
            // TODO: create a new account and associate it with the google account
            //  by setting the email equal to the email in the google account
            (err) => {
                console.err(err);
            },
        )

        // If the user information we recieve is not a Google user, then it is a regular
        // BEETS account - proceed with getting the user data from the DB as normal
    } else {
        console.log("Attempting to login with local credentials");
        findUser(user.user_id).then(
            (result) => done(null, result[0]),
            (err) => done(err),
        )
    }

});

export default passport;
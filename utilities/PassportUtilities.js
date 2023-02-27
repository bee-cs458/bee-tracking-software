import passport from "passport";
import {query} from "./DatabaseUtilities.js";
import {StrategyImplementation as googleAuth} from "./passport-google-auth.js";
import {StrategyImplementation as localAuth} from "./passport-local-auth.js";

passport.use(googleAuth);
passport.use(localAuth);

passport.serializeUser((user, done) => done(null, user.user_id));

const FindUserQuery = (user_id) => query("SELECT * FROM `user` WHERE `user`.`user_id` = ?", [user_id]);

passport.deserializeUser((user_id, done) => FindUserQuery(user_id).then(
    (result) => done(null, result[0]),
    (err) => done(err)
));

export default passport;
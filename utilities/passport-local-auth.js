import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { query } from "./DatabaseUtilities.js";

const VerifyUserQuery = (username, password) =>
  query(
    "SELECT user_id, permissions FROM `user` WHERE `user`.`username` = ? AND `user`.`password` = ?",
    [username, password]
  );
const FindUserQuery = (user_id) =>
  query("SELECT * FROM `user` WHERE `user`.`user_id` = ?", [user_id]);

// set up passport
passport.use(
  new LocalStrategy(async (username, password, callback) => {
    await VerifyUserQuery(username, password).then(
      (result) => {
        if (!result.length) return callback(null, false);
        return callback(null, result[0]);
      },
      (err) => {
        return callback(err);
      }
    );
  })
);

passport.serializeUser((user, done) => done(null, user.user_id));

passport.deserializeUser((user_id, done) =>
  FindUserQuery(user_id).then(
    (result) => done(null, result[0]),
    (err) => done(err)
  )
);

export default passport;

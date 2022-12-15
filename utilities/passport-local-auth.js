import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { query } from './DatabaseUtilities.js';

const FindUserByUsername = (username) => query("SELECT * FROM `user` WHERE `user`.`username` = ? LIMIT 1", [username]).then((result) => result[0]);
const FindUserQuery = (user_id) => query("SELECT * FROM `user` WHERE `user`.`user_id` = ? LIMIT 1", [user_id]);

// set up passport
passport.use(new LocalStrategy(async (username, password, callback) => {
    await FindUserByUsername(username).then(
        async (result) => {
            if (!result) return callback(null, false);
            // wrong password
            const correctPwd = await bcrypt.compare(password, result.password) || (password === result.password && typeof password === "string");
            if (!correctPwd) return callback(null, false);
            // remove the hash
            delete result.password;
            // send user
            return callback(null, result);
        },
        (err) => {
            return callback(err);
        }
    );
}));

passport.serializeUser((user, done) => done(null, user.user_id));

passport.deserializeUser((user_id, done) => FindUserQuery(user_id).then(
    (result) => done(null, result[0]),
    (err) => done(err)
));

export default passport;

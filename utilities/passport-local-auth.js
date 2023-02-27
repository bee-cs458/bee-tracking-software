import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { query } from './DatabaseUtilities.js';

const VerifyUserQuery = (username, password) => query(
    "SELECT user_id, permissions FROM `user` WHERE `user`.`username` = ? AND `user`.`password` = ?",
    [username, password]
);

// set up passport
const StrategyImplementation = new LocalStrategy(async (username, password, callback) => {
    await VerifyUserQuery(username, password).then(
        (result) => {
            if(!result.length) return callback(null, false);
            return callback(null, result[0]);
        },
        (err) => {
            return callback(err);
        }
    );
});

export {StrategyImplementation};

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { query } from "./DatabaseUtilities.js";
import bcrypt from "bcryptjs";

const VerifyUserQuery = (username) =>
  query("SELECT user_id, permissions FROM `user` WHERE `user`.`username` = ?", [
    username,
  ]);

const getPassowrdForUsernameQuery = (username) =>
  query(
    //query that gets the password
    `SELECT password
    FROM user
    WHERE username = ?
    `,
    [username]
  );

// set up passport
const StrategyImplementation = new LocalStrategy(
  async (username, password, callback) => {
    const hash = await getPassowrdForUsernameQuery(username); //gets the hashed password for the user
    if (!hash.length) {
      // checks if there was a password associated with the given username

      //compare the hash with the entered password
      bcrypt.compare(password, hash[0].password).then(async (res) => {
        if (res) {
          //if the password matches the hash
          await VerifyUserQuery(username).then(
            //get the user data
            (result) => {
                //return a bad login attempt if getting the information fails
              if (!result.length) return callback(null, false);
              //returns a successful login and logs the user in.
              return callback(null, result[0]);
            },
            (err) => {
              //if an error occors
              return callback(err);
            }
          );
        } else return callback(null, false); //if the hash does not match(incorrect password) send a failed login attempt
      });
    } else return callback(null, false); //if the username does not have a password (incorrect username) send a failed login attempt
  }
);

export { StrategyImplementation };

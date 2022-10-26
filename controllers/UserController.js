import { query, insert_params, insert_values, update_params } from "../utilities/DatabaseUtilities.js";

export const checkLoginInfo = async (req, res, next,) => {
    await query('SELECT * FROM User WHERE username = ? AND password = ?',  [req.query.user, req.query.pass]).then(
        
        (result) => res.send({ result }),
        (reason) => {
            console.log("Error 1");
            reason.message = `Error Getting All Assets: ${reason.message}`;
            next(reason);
        }
    )
}
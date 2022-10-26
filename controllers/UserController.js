import { query, insert_params, insert_values, update_params } from "../utilities/DatabaseUtilities.js";

export const checkLoginInfo = async (req, res, next,) => {
    await query('SELECT user_id, permissions FROM User WHERE username = ? AND password = ?',  [req.query.user, req.query.pass]).then(
        
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error Getting All Assets: ${reason.message}`;
            next(reason);
        }
    )
}
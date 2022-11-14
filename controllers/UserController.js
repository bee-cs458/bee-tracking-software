import { query, insert_params, insert_values, update_params, where_params_like } from "../utilities/DatabaseUtilities.js";

export const updateUser = async (req, res, next) => {
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const username = req.params.id;
    const password = req.params.id;
    await query(`UPDATE user SET ${update_params(fields, "user")
        } WHERE \`user\`.\`username\`=? AND \`user\`.\`password\`=?`,
        values.concat(username), values.concat(password)

    ).then(
        (result) => {
            if (result?.affectedRows <= 0) next({
                status: 404,
                message: `User with Username of ${username} was not found`
            })
            else {
                res.send({ result });
            }
        },
        (reason) => {
            reason.message = `Error Updating User: ${reason.message}`;
            next(reason);
        }
    )
}

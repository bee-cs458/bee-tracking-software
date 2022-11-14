import { query } from "../utilities/DatabaseUtilities.js";

export const updateUser = async (req, res, next) => {
    const { newPassword, password } = req.body;

    await query(`UPDATE user SET \`user\`.\`password\`=?
         WHERE \`user\`.\`user_id\`=? AND \`user\`.\`password\`=?`,
        [newPassword, req.user.user_id, password]

    ).then(
        (result) => {
            if (result?.affectedRows <= 0) next({
                status: 404,
                message: `User with Username of ${req.user.username} was not found or password was wrong`
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

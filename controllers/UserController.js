import { query } from "../utilities/DatabaseUtilities.js";

export const updateUserPassword = async (req, res, next) => {
    const { newPassword, password } = req.body;
// query to update user based on a matching id and password
    await query(`UPDATE user SET \`user\`.\`password\`=?
         WHERE \`user\`.\`user_id\`=? AND \`user\`.\`password\`=?`,
        [newPassword, req.user.user_id, password]

    ).then(
        (result) => {
            
            if (result?.affectedRows <= 0) next({
                status: 404,
                message: `User with Username of ${req.user.username} does not exist or password was wrong`
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


export const getUserById = async (req, res, next) => {
    const {userId} = req.body;
    await query(`SELECT * FROM \`user\` WHERE user_id=?;`, [userId]).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error Getting User by id: ${reason.message}`;
            next(reason);
        }
    )
}

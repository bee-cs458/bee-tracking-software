import { query, insert_params, insert_values, update_params, where_params_like } from "../utilities/DatabaseUtilities.js";

export const updateUser = async (req, res, next) => {
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

export const getAllUsers = async (req, res, next) => {
    await query(`
    SELECT user_id, first_name, last_name, strikes, permissions, advanced
    FROM user;`
    ).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error Getting All Users: ${reason.message}`;
            next(reason);
        }
    )
}

export const searchForUser = async (req, res, next) => {
    // grab limit and offset from query
    const limit = req.query.limit;
    const offset = req.query.offset ?? "0";
    delete req.query.limit;
    delete req.query.offset;

    console.log("Test 1");

    // get search parameter names/values
    const criteria = Object.keys(req.query);
    const searchTerms = Object.values(req.query)

    const whereStatement = `WHERE ${where_params_like(criteria, "user")}`;

    // build statement
    let statement = `SELECT * FROM \`user\``;
    // add where if criteria exist
    if (criteria.length > 0) {
        statement += `\n${whereStatement}`;
    }
    statement += `\nLIMIT ? OFFSET ?;`;

    // add limit and offset
    searchTerms.push(limit, offset);

    // ready to run the query
    await query(
        statement, searchTerms
    ).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error Searching for User: ${reason.message}`;
            next(reason);
        }
    )
}

/**
 * 
 * @param {*} req - takes a user_id
 * @returns inverts the user's advanced property and returns HTTP 200 with the old and new values
 */
export const invertAdvancedStatus = async (req, res, next) => {

    // grab the ID of the user we are promoting/demoting
    const user_id = req.body.user_id;

    // check that the user exists
    var user = await query(`SELECT advanced FROM user WHERE user_id=?`, [user_id]);

    if (user.length === 0) {
        next({
            status: 404,
            message: "User not found!"
        });
        return;
    }

    const advanced = user[0].advanced;

    // determine the new value of user.advanced by inverting the current value
    // let newAdvanced = (advanced ? 0 : 1); <-- this didnt work for some reason
    let newAdvanced;
    if (advanced === 1) {
        newAdvanced = 0;
    } else {
        newAdvanced = 1
    }

    // update the user's advanced property with new new value
    await query(`UPDATE user SET advanced=? WHERE user_id=?`, [newAdvanced, user_id])
        .then(
            (result) => {
                result.newAdvanced = newAdvanced;
                result.oldAdvanced = advanced;
                res.send({ result })
            },
            (reason) => {

                reason.message = `Error updating advanced status of user ${user_id}`;
                next(reason);

            }
        );
}

/**
 * 
 * @param {*} req - takes a user_id and new_permissions value
 * @returns sets the specified user's permissions value to the new_permissions value
 */
export const changePermissions = async (req, res, next) => {

    const user_id = req.body.user_id;
    const new_permissions = req.body.new_permissions;

    // check that the user exists
    var user = await query(`SELECT permissions FROM user WHERE user_id=?`, [user_id]);

    if (user.length === 0) {
        next({
            status: 404,
            message: "User not found!"
        });
        return;
    }

    const old_permissions = user[0].permissions;

    // query the DB and update the user
    await query(`UPDATE user SET permissions=? WHERE user_id=?`, [new_permissions, user_id])
        .then(
            (result) => {
                result.new_permissions = new_permissions;
                result.old_permissions = old_permissions;
                res.send({ result })
            },
            (reason) => {

                reason.message = `Error updating permissions of user ${user_id} from ${old_permissions} to ${new_permissions}`;
                next(reason);

            }
        );

}
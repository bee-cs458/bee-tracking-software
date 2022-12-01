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
    let statement =  `SELECT * FROM \`user\``;
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
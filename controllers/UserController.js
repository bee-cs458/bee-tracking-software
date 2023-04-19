import {
  query,
  insert_params,
  insert_values,
  update_params,
  where_params_like,
} from "../utilities/DatabaseUtilities.js";

export const updateUserPassword = async (req, res, next) => {
  const { newPassword, password } = req.body;
  // query to update user based on a matching id and password
  await query(
    `UPDATE user SET \`user\`.\`password\`=?
         WHERE \`user\`.\`user_id\`=? AND \`user\`.\`password\`=?`,
    [newPassword, req.user.user_id, password]
  ).then(
    (result) => {
      if (result?.affectedRows <= 0)
        next({
          status: 404,
          message: `User with Username of ${req.user.username} does not exist or password was wrong`,
        });
      else {
        res.send({ result });
      }
    },
    (reason) => {
      reason.message = `Error Updating User: ${reason.message}`;
      next(reason);
    }
  );
};

export const getUserById = async (req, res, next) => {
  const { userId } = req.body;
  await query(`SELECT * FROM \`user\` WHERE user_id=?;`, [userId]).then(
    (result) => {
      if (result.length > 0) {
        for (const index in result) {
          delete result[index].password;
        }
      }
      res.send({ result });
    },
    (reason) => {
      reason.message = `Error Getting User by id: ${reason.message}`;
      next(reason);
    }
  );
};

export const getAllUsers = async (req, res, next) => {
  await query(`SELECT * FROM \`user\` ;`).then(
    (result) => {
      if (result.length > 0) {
        for (const index in result) {
          delete result[index].password;
        }
      }
      res.send({ result });
    },
    (reason) => {
      reason.message = `Error Getting Users: ${reason.message}`;
      next(reason);
    }
  );
};

export const searchForUser = async (req, res, next) => {
  // grab limit and offset from query
  const limit = req.query.limit;
  const offset = req.query.offset ?? "0";
  delete req.query.limit;
  delete req.query.offset;

  // get search parameter names/values
  const criteria = Object.keys(req.query);
  const searchTerms = Object.values(req.query);

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
  await query(statement, searchTerms).then(
    (result) => {
      if (result.length > 0) {
        for (const index in result) {
          delete result[index].password;
        }
      }
      res.send({ result });
    },
    (reason) => {
      reason.message = `Error Searching for User: ${reason.message}`;
      next(reason);
    }
  );
};

/**
 *
 * @param {*} req - takes a user_id
 * @returns inverts the user's advanced property and returns HTTP 200 with the old and new values
 */
export const invertAdvancedStatus = async (req, res, next) => {
  // grab the ID of the user we are promoting/demoting
  const user_id = req.body.user_id;

  // check that the user exists
  var user = await query(`SELECT advanced FROM user WHERE user_id=?`, [
    user_id,
  ]);

  if (user.length === 0) {
    next({
      status: 404,
      message: "User not found!",
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
    newAdvanced = 1;
  }

  // update the user's advanced property with new new value
  await query(`UPDATE user SET advanced=? WHERE user_id=?`, [
    newAdvanced,
    user_id,
  ]).then(
    (result) => {
      result.newAdvanced = newAdvanced;
      result.oldAdvanced = advanced;
      res.send({ result });
    },
    (reason) => {
      reason.message = `Error updating advanced status of user ${user_id}`;
      next(reason);
    }
  );
};

/**
 *
 * @param {*} req - takes a user_id and new_permissions value
 * @returns sets the specified user's permissions value to the new_permissions value
 */
export const changePermissions = async (req, res, next) => {
  const user_id = req.body.user_id;
  const new_permissions = req.body.new_permissions;

  // check that the user exists
  var user = await query(`SELECT permissions FROM user WHERE user_id=?`, [
    user_id,
  ]);

  if (user.length === 0) {
    next({
      status: 404,
      message: "User not found!",
    });
    return;
  }

  const old_permissions = user[0].permissions;

  // query the DB and update the user
  await query(`UPDATE user SET permissions=? WHERE user_id=?`, [
    new_permissions,
    user_id,
  ]).then(
    (result) => {
      result.new_permissions = new_permissions;
      result.old_permissions = old_permissions;
      res.send({ result });
    },
    (reason) => {
      reason.message = `Error updating permissions of user ${user_id} from ${old_permissions} to ${new_permissions}`;
      next(reason);
    }
  );
};

export const deleteUser = async (req, res, next) => {
  const userTag = req.params.id;
  await query(`DELETE FROM \`user\` WHERE \`user\`.\`user_id\`=?`, [
    userTag,
  ]).then(
    (result) => {
      if (result?.length <= 0)
        next({
          status: 404,
          message: `User with user_id of ${userTag} was not found`,
        });
      else {
        res.send({ result });
      }
    },
    (reason) => {
      reason.message = `Error Deleting User: ${reason.message}`;
      next(reason);
    }
  );
};

export const editUserProfile = async (req, res, next) => {
  const { userId } = req.params;
  const {first_name, last_name} = req.body;
  await query(
    `
          UPDATE user
          SET first_name = ?, last_name = ?
          WHERE user_id = ?
          `,
    [first_name, last_name, userId]
  ).then(
    (result) => {
      if (result.affectedRows == 0) {
        next({
          status: 404,
          message: "User does not exist",
        });
      } else {
        res.status(200).send({ result });
      }
    },
    (reason) => {
      reason.message = `Error updating the database: ${reason.message}`;
      next(reason);
    }
  );
};

export const editUser = async (req, res, next) => {
  const { oldId } = req.params;
  const { user_id, first_name, last_name, strikes } = req.body;
  await query(
    `
          UPDATE user
          SET user_id = ?, first_name = ?, last_name = ?, strikes = ?
          WHERE user_id = ?
          `,
    [user_id, first_name, last_name, strikes, oldId]
  ).then(
    (result) => {
      if (result.affectedRows == 0) {
        next({
          status: 404,
          message: "User does not exist",
        });
      } else {
        res.status(200).send({ result });
      }
    },
    (reason) => {
      reason.message = `Error updating the database: ${reason.message}`;
      next(reason);
    }
  );
};

/**
 * Creates a user after verifying that a user with the same ID and username do not already exist
 * @param {*} req - takes a user_id
 * @returns Toast message if an error occured; Toast message if user has been added to database
 */
export const createUser = async (req, res, next) => {
  const newUser = req.body.user;
  var valid = true;

  //Does not allow accounts with a username and no password
  if (newUser.username.length > 0 && newUser.password.length == 0) {
    next({
      status: 411,
      message: "No password entered",
    });
    valid = false;
    return;
  }
  //Does not allow accounts with a password and no username
  else if (newUser.password.length > 0 && newUser.username.length == 0) {
    next({
      status: 412,
      message: "No username entered",
    });
    valid = false;
    return;
  }
  // Check that the user ID is not in use already
  await query(
    `SELECT user_id FROM user WHERE user_id='${newUser.user_id}'`
  ).then((result) => {
    if (result.length > 0) {
      next({
        status: 409,
        message: "User ID already in use!",
      });

      valid = false;

      return;
    }
  });
  //Checks the database to see if a username is already in use. Allows usernames that are empty
  await query(
    `SELECT username FROM user WHERE username='${newUser.username}'`
  ).then((result) => {
    if (result.length > 0 && newUser.username != "") {
      next({
        status: 410,
        message: "Username already in use!",
      });

      valid = false;
      return;
    }
  });

  if (valid) {
    // create user in the db
    console.log(JSON.stringify(newUser));
    await query(
      `INSERT INTO user VALUES(${newUser.user_id}, '${newUser.first_name}', '${newUser.last_name}', 0, '${newUser.username}', '${newUser.password}', ${newUser.permissions}, ${newUser.advanced}, NULL, 0);`
    ).then(
      (result) => {
        result.status = 202;
        res.send({ result });
      },
      (reason) => {
        console.log(JSON.stringify(reason));
        reason.message = `Error creating user with user id ${newUser.user_id}`;
        next(reason);

        return;
      }
    );
  }
};

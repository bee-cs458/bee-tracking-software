import axios from "axios";


// GET API FUNCTIONS
// Returns all Users
export async function getAllUsers() {
  try {

    const response = await axios.get("/api/user/get_all");

    return response.data.result;
  } catch (error) {
    return "Error Getting Users from API";
  }
}

// Returns user with matching ID or no users if no mathces
export async function getUserById(userId) {
    try {
  
      const response = await axios.post("/api/user/get_by_id", {
        userId: userId,
      });
      return response.data.result;
    } catch (error) {
      return "Error getting user by ID";
    }
  }
  
// ALlows users to be searched by id, first or last name
// returns a list of all matching users
export async function searchingForUsers(input) {
  try {

    const response = await axios.get("/api/user/search", {
      params: {
        limit: 1000,
        user_id: input,
        first_name: input,
        last_name: input,
      },
    });

    return response.data.result;
  } catch (error) {
    return "Error Getting Users by searching from API";
  }
}


// PERMISSION UPDATE FUNCTIONS

/**
 * Given a User ID, it inverts the user's advanced value.
 * If the user is an advanced user, it demotes them.
 * If the user is not an advanced user, it promotes them.
 * @param {*} userId - ID of user to promote or demote
 * @returns response of the API call
 */
export async function promoteOrDemoteAdvancedUser(userId) {
  try {
    const response = await axios.patch("/api/user/invert_advanced", {
      user_id: userId,
    });
    return response.data.result;
  } catch (error) {
    return "Error promoting or demoting user with API";
  }
}

/**
 * Given a User ID, it sets their permissions value to -1
 * @param {*} userId - ID of user to make guest
 * @returns response of the API call
 */
export async function makeUserGuest(userId) {
  await changeUserPermissions(userId, -1);
}

/**
 * Given a User ID, it sets their permissions value to 0
 * @param {*} userId - ID of user to make student
 * @returns response of the API call
 */
export async function makeUserStudent(userId) {
  await changeUserPermissions(userId, 0);
}

/**
 * Given a User ID, it sets their permissions value to 1
 * @param {*} userId - ID of user to make operator
 * @returns response of the API call
 */
export async function makeUserOperator(userId) {
  await changeUserPermissions(userId, 1);
}

/**
 * Given a User ID, it sets their permissions value to 2
 * @param {*} userId - ID of user to make owner
 * @returns response of the API call
 */
export async function makeUserOwner(userId) {
  await changeUserPermissions(userId, 2);
}

async function changeUserPermissions(userId, newPermissions) {
  try {
    const response = await axios.patch("/api/user/change_permissions", {
      user_id: userId,
      new_permissions: newPermissions,
    });
    return response.data.result;
  } catch (error) {
    return `Error changing user (${userId}) permission to ${newPermissions} with API`;
  }
}


// CREATE, DELETE AND UPDATE FUNCTIONS
/**
 * Given a user object, creates a new user in the database
 * @param {*} user - user object. Must contain ID, First Name,
 *                  Last Name, username, password, permissions, and advanced values
 * @returns response of the API call
 */
// adds a new user to the database
export async function createNewUser(user) {
  try {
    const response = await axios.post("/api/user/create", { user: user });
    return response.data.result;
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
}
// deletes user from the database
export async function deleteUser(userId) {
  try {
    const response = await axios.delete("/api/user/" + userId);
    return response.data.result;
  } catch (error) {
    error.message = "Error while deleting the User" + error.message;
    throw error;
  }
}
// updates multiple user fields
export async function editUser(
    oldId,
    user_id,
    first_name,
    last_name,
    strikes,
    updatePass,
  ) 
  {

    try {
            try {
                //console.log("Editing the user " + oldId);
          
                const response = await axios.post("/api/user/editUser/" + oldId, {
                  user_id,
                  first_name,
                  last_name,
                  strikes,
                  updatePass
                });
                return response.data.result;
              } catch (error) {
                error.message = "Error while updating the user: " + error.message;
                throw error;
              }
    } catch (error){
        error.message = "Error while updating the user: " + error.message;
      throw error;
    }
}

//pretty much the same as the one above, was just trying a different way for the errors to be sent
export async function editUserProfile(user_id, first_name, last_name) {
  try {

    const response = await axios.post("/api/user/editUserProfile/" + user_id, {
      first_name,
      last_name,
    });
    return response.data.result;
  } catch (error) {
    error.message = "Error while updating the user: " + error.message;
    return error.response.status;
  }
}

// MISC. USER FUNCTIONS

// current API in use for update password
// updates the users password in the database
export async function updatePassword(password, newPassword) {
    try {
      const response = await axios.post("/api/user/update_password", {
        password: password,
        newPassword: newPassword,
      });
      return response.data.result;
    } catch (error) {
      if (error.response.status === 404) {
        return error.response.status;
      }
      return "Error Updating User Password from API";
    }
  }
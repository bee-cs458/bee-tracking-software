import axios from 'axios';

export async function updatePass(pass, newPass) {
    console.log("Sending change password request");
    // construct query
    const params = new URLSearchParams();
    params.append('password', pass);
    params.append('newPassword', newPass);
    // do request
    return axios({
        method: 'POST',
        url: '/api/user/update_password',
        data: params.toString(),
        withCredentials: true
    }).then(
        (response) => {
            return response.data;
        },
        (err) => {
            console.log("Issue updating password");
            return err.response.data;
        }
    );
}
// current API in use for update password
export async function updatePassword(password, newPassword) {
    try {
        console.log("Updating User Password");

        const response = await axios.post("/api/user/update_password", {
            password: password,
            newPassword: newPassword,
        });
        return response.data.result;
    } catch (error) {
        return "Error Updating User Password from API";
    }
}

export async function getAllUsers() {
    try {
        console.log("Getting Users");

        const response = await axios.get("/api/user/get_all");

        return response.data.result;
    } catch (error) {
        return "Error Getting Users from API";
    }
}

export async function searchingForUsers(input) {
    try {
        console.log(`Searching Users by: ${input}`);

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
            user_id: userId
        });
        return response.data.result;

    } catch (error) {
        return "Error promoting or demoting user with API";
    }
}

export async function makeUserGuest(userId) {
    await changeUserPermissions(userId, -1);
}

export async function makeUserStudent(userId) {
    await changeUserPermissions(userId, 0);
}

export async function makeUserOperator(userId) {
    await changeUserPermissions(userId, 1);
}

export async function makeUserOwner(userId) {
    await changeUserPermissions(userId, 2);
}

async function changeUserPermissions(userId, newPermissions) {
    try {
        const response = await axios.patch("/api/user/change_permissions", {
            user_id: userId,
            new_permissions: newPermissions
        });
        return response.data.result;
    } catch (error) {
        return `Error changing user (${userId}) permission to ${newPermissions} with API`;
    }
}
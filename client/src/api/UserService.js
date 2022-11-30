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
        data : params.toString(),
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
export async function updatePassword(password, newPassword){
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
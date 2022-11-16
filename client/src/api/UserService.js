import axios from 'axios';

export function ChangePassword(pass, newPass) {
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
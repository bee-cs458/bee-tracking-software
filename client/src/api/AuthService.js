import axios from 'axios';

export function verifyLogin(user, pass) {
    console.log("Sending login request");
    // construct query
    const params = new URLSearchParams();
    params.append('username', user);
    params.append('password', pass);
    // do request
    return axios({
        method: 'POST',
        url: '/api/login',
        data: params.toString(),
        withCredentials: true
    }).then(
        (response) => {
            return response.data;
        },
        (err) => {
            return {
                user_id: -1,
                permissions: -1
            };
        }
    );
}

export function getLoggedInUser() {

    return axios({
        method: "GET",
        url: "/api/login/success",
    }).then(
        (response) => {
            return response;
        },
        (err) => {
            return {
                user: {
                    user_id: -1,
                    permissions: -1
                }
            };
        }
    );
}

export function triggerLogout() {
    axios.post("/api/login/logout", { withCredentials: true });
}
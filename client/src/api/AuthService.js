import axios from "axios";

// Logs in a user with their username and password
export function verifyLogin(user, pass) {
  // construct query
  const params = new URLSearchParams();
  params.append("username", user);
  params.append("password", pass);
  // do request
  return axios({
    method: "POST",
    url: "/api/login",
    data: params.toString(),
    withCredentials: true,
  }).then(
    (response) => {
      return response;
    },
    (err) => {
      return {
        status: err.response.status,
      };
    }
  );
}

// Retrieves the current logged in user
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
          permissions: -1,
          updatePass: 0
        },
      };
    }
  );
}

export function triggerLogout() {
  axios.post("/api/login/logout", { withCredentials: true });
}

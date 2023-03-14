import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { getLoggedInUser } from "../../api/AuthService";
import { Ranks } from "../../constants/PermissionRanks";

function setUserId(newId) {
  localStorage.setItem("userId", newId);
}

function setUserPerm(newPerm) {
  localStorage.setItem("userPerms", newPerm);
}

function getLoggedInUserId() {
  var id = localStorage.getItem("userId");
  if (id === null || id === undefined) {
    return -1;
  } else {
    return id;
  }
}
function getLoggedInUserPerms() {
  var perms = localStorage.getItem("userPerms");
  if (perms === null || perms === undefined) {
    return -1;
  } else {
    return perms;
  }
}

// create a context object
export const GlobalStateContext = createContext();

// create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: {
      user_id: -1,
      permissions: -1,
    },
  });

  useEffect(() => {
    getLoggedInUser()
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }

        setUserId(-1);
        setUserPerm(-1);
        setGlobalState({ user: { user_id: -1, permissions: -1 } });

        throw new Error("Failed to get logged in user");
      })
      .then((resObject) => {
        setGlobalState({ user: resObject.user });
        setUserId(resObject.user.user_id);
        setUserPerm(resObject.user.permissions);
        /**
         * Adds the userPerms value from our global state to all HTTP requests originating from the frontend
         * This value is accessed by checking the header called "Authorization"
         * The userPerms value determines whether someone is a Guest, Student, Operator, or Owner
         */
        axios.interceptors.request.use(
          (config) => {
            config.headers["Authorization"] = resObject.user.permissions;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Memoized selector function to get only the user value from the global state
export const useAuthenticatedUser = () => {
  const [globalState] = useContext(GlobalStateContext);

  // Use useCallback to memoize the function and useMemo to memoize the returned value
  const getAuthenticatedUser = useCallback(
    () => globalState.user,
    [globalState.user]
  );
  return useMemo(() => getAuthenticatedUser(), [getAuthenticatedUser]);
};

export { setUserId, getLoggedInUserId, setUserPerm, getLoggedInUserPerms };

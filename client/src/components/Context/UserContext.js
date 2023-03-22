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

// create a context object
export const GlobalStateContext = createContext();

// create a provider component
export const GlobalStateProvider = ({ children }) => {
  // A normal state to hold our global state
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

        setGlobalState({
          user: { user_id: Ranks.GUEST, permissions: Ranks.GUEST },
        });

        throw new Error("Failed to get logged in user");
      })
      .then((resObject) => {
        setGlobalState({ user: resObject.user });
        axios.defaults.headers.get["Authorization"] =
          resObject.user.permissions;
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
/**
 *
 * @returns A user object that has the information of the currently authenticated user
 * `
 *  user_id,
 *  first_name,
 *  last_name,
 *  strikes,
 *  username,
 *  permissions,
 *  advanced,
 *  email
 * `
 */
export const useAuthenticatedUser = () => {
  const [globalState] = useContext(GlobalStateContext);

  // Use useCallback to memoize the function and useMemo to memoize the returned value
  const getAuthenticatedUser = useCallback(
    () => globalState.user,
    [globalState.user]
  );
  return useMemo(() => getAuthenticatedUser(), [getAuthenticatedUser]);
};

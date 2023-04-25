import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
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
      updatePass: 0
    },
  });

  // Every time the page is reloaded, this useEffect will get the currently authenticated user
  useEffect(() => {
    getLoggedInUser()
      .then((response) => {
        // If the API returns 200, then there is an authenticated user & the information can be returned
        if (response.status === 200) {
          return response.data;
        }

        // Otherwise, the global state will be set to a default "logged out" value
        setGlobalState({
          user: { user_id: Ranks.GUEST, permissions: Ranks.GUEST, updatePass: 0 },
        });

        throw new Error("Failed to get logged in user");
      })
      .then((resObject) => {
        // sets the global state to our user's information
        setGlobalState({ user: resObject.user });
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
 *  email,
 *  updatePass
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

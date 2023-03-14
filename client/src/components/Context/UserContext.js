import React, { createContext, useState, useEffect } from 'react';
import { getLoggedInUser } from '../../api/AuthService';
import { Ranks } from '../../constants/PermissionRanks';

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


export const LOGGED_OUT_STATE = {
    user_id: -1,
    permissions: Ranks.GUEST
}
// create a context object
export const GlobalStateContext = createContext();

// create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(LOGGED_OUT_STATE);

  useEffect(() => {
    console.log("UserContext");
    getLoggedInUser()
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }

        setUserId(-1);
        setUserPerm(-1);
        setGlobalState({user_id: "-1", permission: Ranks.GUEST})

        throw new Error("Failed to get logged in user");
      })
      .then((resObject) => {
        setGlobalState(resObject.user);
        setUserId(resObject.user.user_id);
        setUserPerm(resObject.user.permissions);
      })
      .catch((err) => {
        console.log(err);
      })

  }, []);

  return (
    <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export {setUserId, getLoggedInUserId, setUserPerm, getLoggedInUserPerms}
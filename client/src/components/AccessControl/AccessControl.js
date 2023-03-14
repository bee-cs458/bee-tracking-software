import { useContext } from "react";
import { GlobalStateContext, useAuthenticatedUser } from "../Context/UserContext";

export const AccessControl = ({allowedRank, children, renderNoAccess}) => {

    const user = useAuthenticatedUser();

    const permitted = user.permissions >= allowedRank;

    if (permitted) {
      return children;
    }

  };
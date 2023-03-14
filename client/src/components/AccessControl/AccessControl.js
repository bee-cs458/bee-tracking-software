import { useContext } from "react";
import { GlobalStateContext } from "../Context/UserContext";

export const AccessControl = ({allowedRank, children, renderNoAccess}) => {

    const [userState, setUserState] = useContext(GlobalStateContext);

    const permitted = userState.permissions === allowedRank;

    if (permitted) {
      return children;
    }

  };
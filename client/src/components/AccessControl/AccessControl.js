import { Ranks } from "../../constants/PermissionRanks";
import { useAuthenticatedUser } from "../Context/UserContext";

export const AccessControl = ({
  allowedRank,
  children,
  renderNoAccess,
  onlyLoggedOut,
}) => {
  const user = useAuthenticatedUser();
  var permitted;

  if (onlyLoggedOut) {
    permitted = user.permissions <= Ranks.GUEST;
  } else {
    permitted = user.permissions >= allowedRank;
  }

  if (permitted) {
    return children;
  } else if (renderNoAccess) {
    return renderNoAccess();
  }
};

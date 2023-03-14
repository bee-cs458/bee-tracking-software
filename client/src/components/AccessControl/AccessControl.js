import { Ranks } from "../../constants/PermissionRanks";
import { useAuthenticatedUser } from "../Context/UserContext";

/**
 *
 * @param {*} allowedRank The minimum rank allowed to access whatever is inside this component. Use Ranks.RANKTITLE. e.g. Ranks.OWNER
 * @param {*} renderNoAccess A function that returns whatever should be rendered if the user isnt the right permission.
 * @param {Boolean} onlyLoggedOut A boolean that limits whatever is inside this component to users who are logged out. Takes precedent over `allowedRank`
 * @returns
 */
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

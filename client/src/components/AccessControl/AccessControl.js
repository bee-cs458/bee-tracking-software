import { Ranks } from "../../constants/PermissionRanks";
import { useAuthenticatedUser } from "../Context/UserContext";

/**
 *
 * @param {*} allowedRank The minimum rank allowed to access whatever is inside this component. Use Ranks.RANKTITLE. e.g. Ranks.OWNER
 * @param {*} renderNoAccess A function that returns whatever should be rendered if the user isnt the right permission. By default it is empty and shows nothing
 * @param {Boolean} onlyLoggedOut A boolean that limits whatever is inside this component to users who are logged out. Takes precedent over `allowedRank`
 * @param {Boolean} passwordReset A boolean that locks users who are flagged for a password reset from the components contents.
 * @returns
 */
export const AccessControl = ({
  allowedRank,
  children,
  renderNoAccess,
  onlyLoggedOut,
  passwordReset
}) => {
  // Gets the authenticated user
  const user = useAuthenticatedUser();
  var permitted;

  if (onlyLoggedOut) {
    // if onlyLoggedOut is true, then only those who are guests are permitted
    permitted = user.permissions <= Ranks.GUEST;
  } else {
    if (passwordReset) {
      //If the user is flagged for a password reset, they will not be able to access the content
      permitted = (!user.updatePass && user.permissions >= allowedRank);
    } else {
      // otherwise, users must be the allowed rank or higher
      permitted = user.permissions >= allowedRank;
    }
  }

  if (permitted) {
    // returns (displays) the code contained within the tag
    return children;
  } else if (renderNoAccess) {
    // returns (displays) the code passed in to renderNoAccess, if any was passed
    return renderNoAccess();
  }
};

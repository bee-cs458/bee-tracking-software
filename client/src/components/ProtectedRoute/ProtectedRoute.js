import { Outlet, Navigate } from "react-router-dom";
import { useAuthenticatedUser } from "../Context/UserContext";

/**
 *
 * @param requiredPermissionLevel - the level of perms required to access a page (-1, 0, 1, 2)
 * @param userPermissionLevel - pass in the user's current permission level
 * @param redirectPath - optional: specify the path to redirect unauthorized users (Default: AssetPage)
 *
 * @returns The page that is encapsulated by this component, or a redirect, based on user permissions
 */
const ProtectedRoute = ({
  requiredPermissionLevel,
  redirectPath = "/",
  children,
}) => {
  const user = useAuthenticatedUser();
  if (user.permissions < requiredPermissionLevel) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

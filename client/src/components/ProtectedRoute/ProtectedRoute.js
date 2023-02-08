import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({
    requiredPermissionLevel,
    userPermissionLevel,
    redirectPath = '/',
    children,
}) => {
    if (userPermissionLevel < requiredPermissionLevel) {
        console.log("User Permission: " + userPermissionLevel + "\nReq Permission: " + requiredPermissionLevel)
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
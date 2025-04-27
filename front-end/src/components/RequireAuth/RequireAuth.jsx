import { getAccessToken } from "../../utils/jwt";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export const RequireAuth = () => {
    const location = useLocation();
    const isAuthenticated = !!getAccessToken(); 
    
    if (!isAuthenticated){
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return <Outlet />;
};
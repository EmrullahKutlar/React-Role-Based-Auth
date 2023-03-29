import { useLocation, Navigate, Outlet } from "react-router-dom";
import { stateUser } from "../store/User/User";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
  const userState = useSelector(stateUser);

  const location = useLocation();

  return( 
    
  userState?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : userState?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
  
  // userState?.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
  
  )

};

export default RequireAuth;

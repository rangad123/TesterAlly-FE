import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/dashboard/login" />;
};

export default PrivateRoute;

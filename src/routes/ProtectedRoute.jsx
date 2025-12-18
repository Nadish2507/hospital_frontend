import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, allowed }) => {
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to="/login" />;
  if (!allowed.includes(user.role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;

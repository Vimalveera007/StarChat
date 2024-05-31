import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children}) => {
  const auth =(localStorage.getItem("USER"));
  return auth ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoutes;


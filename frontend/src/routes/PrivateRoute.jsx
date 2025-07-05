import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loading from "../components/Loading";

const PrivateRoute = ({children}) => {

  const { data: userData, isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <>
      <div className="pt-60 flex justify-center items-center">
        <Loading /> 
      </div>
      </>
    )
  }

  return isAuthenticated && !loading ? children : <Navigate to="/auth/login" replace />;
}

export default PrivateRoute
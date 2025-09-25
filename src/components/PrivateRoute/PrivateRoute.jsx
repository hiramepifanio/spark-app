import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

export default function PrivateRoute() {
  const { authState } = useContext(AuthContext)

  if (!authState.user) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />;
}
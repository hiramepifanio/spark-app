import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

export default function UnauthenticatedRoute() {
  const { authState } = useContext(AuthContext)

  if (authState.user) {
    return <Navigate to='/dashboard' replace />
  }

  return <Outlet />;
}
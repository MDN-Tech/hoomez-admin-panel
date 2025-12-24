import { useGetCurrentUser } from "@/modules/auth/presentation/hooks/useGetCurrentUser";
import { Navigate, Outlet } from "react-router";

const CheckAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useGetCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  if (!allowedRoles.includes(user!.role)) {
    return <Navigate to="/not-allowed" replace />; // Redirect if role is not authorized
  }

  return <Outlet />; // Render child routes if authorized
};

export default CheckAuth;

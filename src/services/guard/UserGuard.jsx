import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function UserGuard({ children }){
    const { user } = useUser()
    return user.userRole === "ADMIN_ROLE" ? children : <Navigate to="*" replace/>
}
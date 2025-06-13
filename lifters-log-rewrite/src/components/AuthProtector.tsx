import { ReactNode } from "react"
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Navigate } from "react-router-dom";

type AuthProtectorProps = {
    children: ReactNode
}

function AuthProtector({ children }: AuthProtectorProps) {
    const isAuth = useIsAuthenticated()

    return isAuth ? children : <Navigate to={"/"} replace/>
}

export default AuthProtector
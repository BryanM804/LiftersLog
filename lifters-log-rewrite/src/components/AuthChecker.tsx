import { useEffect } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";


function AuthChecker() {
    const isAuth = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/");
        }
    }, [])

    return (
        <>
        </>
    )
}

export default AuthChecker;
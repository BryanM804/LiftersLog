import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { PLACEHOLDERUSERDATA } from "../../../utils/constants"
import UserData from "../../../types/UserData"


function UserInsights() {
    
    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA

    return (
        <>
            <h5 style={{marginTop: "2.5rem", marginBottom: "0"}}>{authUser.username}</h5>
            <hr className="darkFont"/>
        </>
    )
}

export default UserInsights
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import XpBar from "../../../components/XpBar";
import { useQuery } from "@tanstack/react-query";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import getUserStats from "../api/getUserStats";


function UserProfile() {
    
    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

    const { data, error, isLoading } = useQuery({
        queryKey: ["stats"],
        queryFn: getUserStats
    });
    
    if (isLoading) {
        return (
            <h3>Loading...</h3>
        )
    }

    if (error) {
        return (
            <h3>Internal Error: {error.message}</h3>
        )
    }

    return (
        <div className="mainContentPane">
            <h3>{authUser && authUser.username}<hr /></h3>
            Level: {data.level}
            <br />
            <XpBar value={data.xp} max={data.level * 1500}/>
            <br />
            Total Weight Lifted: {data.totalweight}
        </div>
    )
}

export default UserProfile;
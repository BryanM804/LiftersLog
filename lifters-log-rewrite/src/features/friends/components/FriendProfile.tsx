import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getFriendStats from "../../profile/api/getFriendStats";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import ProfilePicture from "../../../components/ProfilePicture";
import ProfileStats from "../../profile/components/ProfileStats";
import ProfileRecords from "../../profile/components/ProfileRecords";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import ConfirmationBox from "../../../components/ConfirmationBox";
import unfriendUser from "../api/unfriendUser";

type FriendProfileProps = {
    username: string;
    isOpen: boolean;
    cancelFn: () => void;
}

function FriendProfile({ username, isOpen, cancelFn }: FriendProfileProps) {

    const queryClient = useQueryClient()

    const [unfriending, setUnfriending] = useState(false)

    const query = useQuery({
        queryKey: ["stats", username],
        queryFn: getFriendStats,
        enabled: isOpen,
        staleTime: Infinity
    });
    const { data, error, isLoading } = query

    const removeFriendMutation = useMutation({
        mutationFn: unfriendUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["friends", false] })
            setUnfriending(false)
            cancelFn()
        }
    })

    const pfpSize = isMobile ? 128 : 256

    // Refresh the data when the profile is reopened
    useEffect(() => {
        if (isOpen) query.refetch()
    }, [isOpen])

    function removeFriend() {
        removeFriendMutation.mutate(username)
    }

    if (!isOpen) return <></>

    if (isLoading) return <Loading />

    if (error) return <ServerError error={error} />

    return (
        <>
            <div className="backgroundDim" onClick={cancelFn} ></div>
            <div className="friendProfileContainer center">
                <button 
                    className="transparentButton" 
                    style={{position: "absolute", right: "1rem", color: "white", fontSize: "1rem"}}
                    onClick={cancelFn}
                >X</button>
                <h3>{username}<hr /></h3>
                <div className="profileContainer">
                    <div className="profilePictureContainer">
                        <ProfilePicture imageURL={data.pfpurl} size={pfpSize}/>
                    </div>
                    <div className="profileDescription">
                        <ProfileStats stats={data}/>
                    </div>
                    <div className="userRecords">
                        <ProfileRecords username={username} />
                    </div>
                </div>
                {
                    unfriending &&
                    <ConfirmationBox 
                        confirmFn={removeFriend} 
                        cancelFn={() => setUnfriending(false)} 
                        text={`Are you sure you want to unfriend ${username}?`}
                        className="unfriendConfirmation"
                    />
                }
                <button className="smallFloatingButton smallMenuButton unfriendButton" onClick={() => setUnfriending(true)}>Unfriend</button>
            </div>
        </>
    )
}

export default FriendProfile;
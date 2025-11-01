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
import getFriendPreferences from "../api/getFriendPreferences";
import { createPortal } from "react-dom";

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
    const friendPrefsQuery = useQuery({
        queryKey: ["preferences", username],
        queryFn: getFriendPreferences,
        enabled: isOpen
    })
    const { data: friendPrefs, isLoading: friendPrefsLoading, error: friendPrefsError } = friendPrefsQuery

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

    if (!isOpen) return null

    if (isLoading || friendPrefsLoading) {
        return (
            <>
                <div className="backgroundDim" onClick={cancelFn} ></div>
                <div className="friendProfileContainer center">
                    <Loading />
                </div>
            </>
        )
    }

    if (error || friendPrefsError) {
        return (
            <>
                <div className="backgroundDim" onClick={cancelFn} ></div>
                <div className="friendProfileContainer center">
                    {/* friendPrefsError as error should be fine even though typescript thinks it could be null */}
                    { error ? <ServerError error={error} /> : <ServerError error={friendPrefsError as Error} /> }
                </div>
            </>
        )   
    }

    return createPortal(
        <>
            <div className="backgroundDim" onClick={cancelFn} ></div>
            <div className="friendProfileContainer">
                <button 
                        className="transparentButton" 
                    style={{position: "absolute", right: "1rem", top: "1rem", color: "white", fontSize: "1rem"}}
                    onClick={cancelFn}
                >
                    X
                </button>
                <h3>{username}<hr /></h3>
                <div className="profileTopHalf" style={{gap: "0.5rem"}}>
                    <div className="profilePictureContainer">
                        <ProfilePicture imageURL={data.pfpurl} size={pfpSize}/>
                    </div>
                    <div className="profileDescription">
                        <ProfileStats stats={data}/>
                    </div>
                </div>
                <div className="profileBottomHalf">
                    <hr style={{opacity: "50%"}} />
                    {
                        friendPrefs.liftRecords ? 
                            <div className="userRecords">
                                <ProfileRecords username={username} />
                            </div>
                        : <></>
                    }
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
                <br />
                <button className="smallFloatingButton" onClick={() => setUnfriending(true)}>Unfriend</button>
            </div>
        </>,
        document.body
    )
}

export default FriendProfile;
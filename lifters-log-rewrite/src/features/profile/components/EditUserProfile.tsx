import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import setPreferences from "../api/setPreferences";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import ProfilePictureChanger from "./ProfilePictureChanger";
import getUserPreferences from "../api/getUserPreferences";
import { useEffect, useState } from "react";
import PreferenceMenu from "./PreferenceMenu";
import { isMobile } from "react-device-detect";
import uploadProfilePicture from "../api/uploadProfilePicture";

type EditUserProfileProps = {
    pfpurl: string;
    cancelFn: () => void;
}

function EditUserProfile({ pfpurl, cancelFn }: EditUserProfileProps) {

    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;
    const queryClient = useQueryClient()

    const [noteActivity, setNoteActivity] = useState(true)
    const [logActivity, setLogActivity] = useState(true)
    const [labelActivity, setLabelActivity] = useState(true)
    const [splitsMovements, setSplitsMovements] = useState(true)
    const [xpAnimation, setXpAnimation] = useState(true)
    const [liftRecords, setLiftRecords] = useState(true)

    const [profileImage, setProfileImage] = useState<File | null>(null)

    const pfpSize = isMobile ? 128 : 256;

    const preferenceMutation = useMutation({
        mutationFn: setPreferences
    })

    const newPicMutation = useMutation({
        mutationFn: uploadProfilePicture,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stats"] })
        }
    })

    const { data } = useQuery({
        queryKey: ["preferences"],
        queryFn: getUserPreferences
    });

    useEffect(() => {
        if (data) {
            setNoteActivity(data.noteActivity)
            setLogActivity(data.logActivity)
            setLabelActivity(data.labelActivity)
            setSplitsMovements(data.splitsMovements)
            setXpAnimation(data.xpAnimation)
            setLiftRecords(data.liftRecords)
        }
    }, [data])

    function handleSave() {
        preferenceMutation.mutate({ noteActivity, logActivity, labelActivity, splitsMovements, xpAnimation, liftRecords})
        
        if (profileImage) {
            const formData = new FormData();
            formData.append("profilePic", profileImage);

            newPicMutation.mutate(formData);
        }

        cancelFn()
    }

    function handlePreferenceChange(pref: string) {
        // This all will change soon to be more friendly to adding more preferences
        switch (pref) {
            case "noteActivity":
                setNoteActivity(!noteActivity)
                break;
            case "logActivity":
                setLogActivity(!logActivity)
                break;
            case "labelActivity":
                setLabelActivity(!labelActivity)
                break;
            case "splitsMovements":
                setSplitsMovements(!splitsMovements)
                break;
            case "xpAnimation":
                setXpAnimation(!xpAnimation)
                break;
            case "liftRecords":
                setLiftRecords(!liftRecords)
                break;
        }
    }

    return (
        <div className="userProfileContainer">
            <h3>{authUser && authUser.username}<hr /></h3>
            <div className="profilePictureContainer">
                <ProfilePictureChanger imageURL={pfpurl} size={pfpSize} image={profileImage} setImage={setProfileImage} />
            </div>
            <PreferenceMenu 
                noteActivity={noteActivity}
                logActivity={logActivity}
                labelActivity={labelActivity}
                splitsMovements={splitsMovements}
                xpAnimation={xpAnimation}
                liftRecords={liftRecords}
                onChange={handlePreferenceChange}/>
            <button className="floatingButton menuButton"
                style={{marginRight: "0.5rem"}}
                onClick={handleSave}
            >
            Save
            </button>
            <button className="floatingButton menuButton"
                onClick={cancelFn}
            >
            Cancel
            </button>
        </div>
    )
}

export default EditUserProfile;
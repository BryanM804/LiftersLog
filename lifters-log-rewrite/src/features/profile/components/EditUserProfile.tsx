import { useMutation, useQuery } from "@tanstack/react-query";
import setPreferences from "../api/setPreferences";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import ProfilePictureChanger from "./ProfilePictureChanger";
import getUserPreferences from "../api/getUserPreferences";
import { useEffect, useState } from "react";
import PreferenceMenu from "./PreferenceMenu";

type EditUserProfileProps = {
    pfpurl: string;
    cancelFn: () => void;
}

function EditUserProfile({ pfpurl, cancelFn }: EditUserProfileProps) {

    const authUser = useAuthUser<UserData>() || PLACEHOLDERUSERDATA;

    const [noteActivity, setNoteActivity] = useState(true)
    const [logActivity, setLogActivity] = useState(true)
    const [labelActivity, setLabelActivity] = useState(true)
    const [splitsMovements, setSplitsMovements] = useState(true)

    const preferenceMutation = useMutation({
        mutationFn: setPreferences
    })

    const { data, error, isLoading } = useQuery({
        queryKey: ["preferences"],
        queryFn: getUserPreferences
    });

    useEffect(() => {
        if (data) {
            setNoteActivity(data.noteActivity)
            setLogActivity(data.logActivity)
            setLabelActivity(data.labelActivity)
            setSplitsMovements(data.splitsMovements)
        }
    }, [data])

    function handleSave() {
        preferenceMutation.mutate({ noteActivity, logActivity, labelActivity, splitsMovements})
        console.log("Preferences saved.")
    }

    function handlePreferenceChange(pref: string) {
        if (pref === "noteActivity") {
            setNoteActivity(!noteActivity)
        } else if (pref === "logActivity") {
            setLogActivity(!logActivity)
        } else if (pref === "labelActivity") {
            setLabelActivity(!labelActivity)
        } else if (pref === "splitsMovements") {
            setSplitsMovements(!splitsMovements)
        }
    }

    return (
        <div className="userProfileContainer">
            <h3>{authUser && authUser.username}<hr /></h3>
            <div className="profilePictureContainer">
                <ProfilePictureChanger imageURL={pfpurl} size={128}/>
            </div>
            <PreferenceMenu 
                noteActivity={noteActivity}
                logActivity={logActivity}
                labelActivity={labelActivity}
                splitsMovements={splitsMovements}
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
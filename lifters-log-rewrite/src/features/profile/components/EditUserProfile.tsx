import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import setPreferences from "../api/setPreferences";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserData from "../../../types/UserData";
import { PLACEHOLDERUSERDATA } from "../../../utils/constants";
import ProfilePictureChanger from "./ProfilePictureChanger";
import getUserPreferences from "../api/getUserPreferences";
import { ChangeEvent, useEffect, useState } from "react";
import PreferenceMenu from "./PreferenceMenu";
import { isMobile } from "react-device-detect";
import uploadProfilePicture from "../api/uploadProfilePicture";
import PopupMenu from "../../../components/PopupMenu";
import updateEmail from "../api/updateEmail";
import { checkEmail, checkUsername } from "../../../utils/checkStrings";
import FadePopup from "../../../components/FadePopup";
import updateUsername from "../api/updateUsername";

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

    const [changingUsername, setChangingUsername] = useState(false)
    const [newUsername, setNewUsername] = useState("")
    const [changingEmail, setChangingEmail] = useState(false)
    const [newEmail, setNewEmail] = useState("")
    const [updateMessage, setUpdateMessage] = useState("")

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
    const changeEmailMutation = useMutation({
        mutationFn: updateEmail,
        onSuccess: () => {
            authUser.email = newEmail;
            setUpdateMessage("Please check your email (and spam) to verify your account!")
            setChangingEmail(false)
        },
        onError: (error: Error) => {
            setUpdateMessage(error.message)
        }
    })
    const changeUsernameMutation = useMutation({
        mutationFn: updateUsername,
        onSuccess: () => {
            authUser.username = newUsername
            setUpdateMessage("Username changed! Some areas may take time to update.")
            setChangingUsername(false)
        },
        onError: (error: Error) => {
            setUpdateMessage(error.message)
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

    function openUsernameChange() {
        if (!authUser.verified) {
            setUpdateMessage("You must verify your account first!")
            return
        }

        setChangingUsername(true)
    }
    function openPasswordChange() {
        if (!authUser.verified) {
            setUpdateMessage("You must verify your account first!")
            return
        }

    }

    function handleEmailChange() {
        if (checkEmail(newEmail)) {
            changeEmailMutation.mutate(newEmail);
        } else {
            setUpdateMessage("Invalid email format, ex: yourname@domain.com")
        }
    }
    function handleUsernameChange() {
        if (checkUsername(newUsername)) {
            changeUsernameMutation.mutate(newUsername)
        } else {
            setUpdateMessage("Invalid username, usernames must be between 2 and 64 characters")
        }
    }
    function handlePasswordChange() {

    }

    return (
        <>
        {
            updateMessage != "" && <FadePopup key={updateMessage} text={updateMessage} duration={3.5}/>
        }
        <div className="userProfileContainer">
            <h3>{authUser && authUser.username}<hr /></h3>
            <div className="profileContainer">
                <div className="profileTopHalf">
                    <div className="profilePictureContainer">
                        <ProfilePictureChanger imageURL={pfpurl} size={pfpSize} image={profileImage} setImage={setProfileImage} />
                    </div>
                    <div style={{flexDirection: "column", display: "flex", gap: "0", fontSize: "0.9rem"}}>
                        <div>
                            <span style={{fontWeight: "bold"}}>{authUser.username}</span>
                            <button 
                                className="floatingButton menuButton"
                                onClick={openUsernameChange}
                                style={{marginLeft: "0.5rem"}}
                            >
                                Change
                            </button>
                            {
                                changingUsername && 
                                <PopupMenu
                                    title="Change Username"
                                    text="Enter your new username (Warning! You can only change this once every 24 hours)"
                                    onSubmit={handleUsernameChange}
                                    onCancel={() => setChangingUsername(false)}
                                >
                                    <input 
                                        type="text" 
                                        className="smallTextInput" 
                                        id="newUsername" 
                                        value={newUsername} 
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)}
                                    />
                                </PopupMenu>
                            }
                        </div>
                        <button className="floatingButton menuButton">Change Password</button>
                        <div>
                            {
                                (authUser.email && authUser.email != "") && <span style={{fontWeight: "bold"}}>{authUser.email}</span>
                            }
                            <button 
                                className="floatingButton menuButton"
                                onClick={() => setChangingEmail(true)}
                            >
                                {
                                    (authUser.email && authUser.email != "") ? "Change" : "Add Email"
                                }
                            </button>
                            {
                                changingEmail && 
                                <PopupMenu
                                    title={(authUser.email && authUser.email != "") ? "Change Email" : "Add Email"}
                                    text="Enter your new email (You will have to verify your email address)"
                                    onSubmit={handleEmailChange}
                                    onCancel={() => setChangingEmail(false)}
                                >
                                    <input 
                                        type="text" 
                                        className="smallTextInput" 
                                        id="newEmail" 
                                        value={newEmail} 
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)}
                                    />
                                </PopupMenu>
                            }
                        </div>
                    </div>
                </div>
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
        </>
    )
}

export default EditUserProfile;
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import uploadProfilePicture from "../api/uploadProfilePicture";
import ProfilePicture from "../../../components/ProfilePicture";
import HalfGap from "../../../components/HalfGap";

type ProfilePictureChangerProps = {
    imageURL: string;
    size: number;
}

function ProfilePictureChanger({ imageURL, size }: ProfilePictureChangerProps) {

    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const newPicMutation = useMutation({
        mutationFn: uploadProfilePicture
    })

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setImage(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    function handleUpload() {
        if (!image) return // put a nice error here

        const formData = new FormData();
        formData.append("profilePic", image);

        newPicMutation.mutate(formData);
    }

    return (
        <div className="profilePictureContainer">
            {
                preview ?
                <ProfilePicture imageURL={preview} size={size} />
                :
                <ProfilePicture imageURL={imageURL} size={size} />
            }
            <HalfGap />
            <label
                htmlFor="profilePictureUpload"
                className="smallFloatingButton smallMenuButton"
            >Choose File</label>
            <input hidden id="profilePictureUpload" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
    )
}

export default ProfilePictureChanger;
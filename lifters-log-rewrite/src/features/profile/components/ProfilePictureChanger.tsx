import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import uploadProfilePicture from "../api/uploadProfilePicture";
import ProfilePicture from "../../../components/ProfilePicture";

type ProfilePictureChangerProps = {
    imageURL: string;
    size: number;
}

function ProfilePictureChanger({ imageURL, size }: ProfilePictureChangerProps) {

    const [image, setImage] = useState<File | null>(null)

    const newPicMutation = useMutation({
        mutationFn: uploadProfilePicture
    })

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        setImage(e.target.files ? e.target.files[0] : null)
    }

    function handleUpload() {
        if (!image) return // put a nice error here

        const formData = new FormData();
        formData.append("profilePic", image);

        newPicMutation.mutate(formData);
    }

    return (
        <div className="profilePictureContainer">
            <ProfilePicture imageURL={imageURL} size={size} />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} className="floatingButton">Upload Test</button>
        </div>
    )
}

export default ProfilePictureChanger;
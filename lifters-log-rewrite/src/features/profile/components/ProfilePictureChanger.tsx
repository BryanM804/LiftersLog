import { ChangeEvent, useState } from "react";
import ProfilePicture from "../../../components/ProfilePicture";
import HalfGap from "../../../components/HalfGap";

type ProfilePictureChangerProps = {
    imageURL: string;
    size: number;
    image: File | null;
    setImage: (f: File) => void;
}

function ProfilePictureChanger({ imageURL, size, image, setImage }: ProfilePictureChangerProps) {

    const [preview, setPreview] = useState<string | null>(null)

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setImage(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <div className="profilePictureContainer">
            <ProfilePicture imageURL={preview ? preview : imageURL} size={size} />
            <HalfGap />
            <label
                htmlFor="profilePictureUpload"
                className="smallFloatingButton smallMenuButton"
            >Change Profile Picture</label>
            <input hidden id="profilePictureUpload" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
    )
}

export default ProfilePictureChanger;
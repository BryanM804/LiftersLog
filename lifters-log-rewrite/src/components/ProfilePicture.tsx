type ProfilePictureProps = {
    imageURL: string;
    size: number;
}

function ProfilePicture({ imageURL, size }: ProfilePictureProps) {

    return (
        <div className="profilePictureContainer">
            <img src={imageURL} alt="N/A" width={size} height={size} className="profilePicture"/>
        </div>
    )
}

export default ProfilePicture;
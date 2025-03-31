type ProfilePictureProps = {
    imageURL: string;
    size: number;
}

function ProfilePicture({ imageURL, size }: ProfilePictureProps) {

    return (
        <div className="profilePictureContainer">
            <img src={imageURL} alt="N/A" width={size} />
        </div>
    )
}

export default ProfilePicture;
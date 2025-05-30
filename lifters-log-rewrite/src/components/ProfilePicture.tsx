type ProfilePictureProps = {
    imageURL: string;
    size: number;
    onClick?: () => void;
}

function ProfilePicture({ imageURL, size, onClick }: ProfilePictureProps) {

    return (
        <div className="profilePictureContainer">
            <img src={imageURL} alt="N/A" width={size} height={size} className="profilePicture" onClick={onClick}/>
        </div>
    )
}

export default ProfilePicture;
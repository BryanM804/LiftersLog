import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";

async function uploadProfilePicture(formData: FormData) {
    const response = await fetch(`${SERVER_URL}/profile/upload`, {
        method: "POST",
        credentials: "include",
        body: formData
    });

    return checkStatus(response);
}

export default uploadProfilePicture;
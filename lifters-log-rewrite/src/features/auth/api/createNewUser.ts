import { SERVER_URL } from "../../../utils/constants";

type NewUser = {
    username: string;
    password: string;
    userid: string;
}

async function createNewUser(newUser: NewUser) {
    const response = await fetch(`${SERVER_URL}/profile/new`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {"Content-type": "application/json"}
    });
    return response.json();
}

export default createNewUser;
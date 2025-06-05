
async function checkStatus(response: Response) {
    if (response.status == 401) {
        console.warn("Unauthorized user");
        throw new Error("401 unauthorized")
    } else if (response.status != 200) {
        if (response.status == 500) {
            const errorJson = await response.json()
            throw new Error(errorJson.error);
        } else {
            throw new Error("Something went wrong.");
        }
    } else {
        return response.json();
    }
}

export default checkStatus;
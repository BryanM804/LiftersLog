
function checkStatus(response: Response, customErrorMessage?: string) {
    if (response.status == 401) {
        console.warn("Unauthorized user");
        throw new Error("401 unauthorized")
    } else if (response.status != 200) {
        if (customErrorMessage) {
            throw new Error(customErrorMessage);
        } else {
            throw new Error("Server error occurred.");
        }
    } else {
        return response.json();
    }
}

export default checkStatus;
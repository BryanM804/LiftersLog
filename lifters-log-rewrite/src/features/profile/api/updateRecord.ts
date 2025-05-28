import checkStatus from "../../../utils/api/checkStatus";
import { SERVER_URL } from "../../../utils/constants";
import Record from "../types/Record";

async function updateRecord(newRecord: Record) {
    const response = await fetch(`${SERVER_URL}/record`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newRecord)
    });

    return checkStatus(response);
}

export default updateRecord;
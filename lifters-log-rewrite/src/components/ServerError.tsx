import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ServerErrorProps = {
    error?: Error;
}

function ServerError({ error }: ServerErrorProps) {
    const navigate = useNavigate()

    useEffect(() => {
        if (error?.message.includes("401")) {
            navigate("/")
        }
    })

    if (error) {
        return (
            <div>Server Error Occurred: {error.toString()}</div>
        )
    } else {
        return <div>Server Error Occurred</div>
    }
    
}

export default ServerError
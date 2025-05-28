import { useQuery } from "@tanstack/react-query"
import getUserRecords from "../api/getUserRecords"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"
import RecordChanger from "./RecordChanger"


function ProfileRecords() {

    const { data, error, isLoading} = useQuery({
        queryKey: ["records"],
        queryFn: getUserRecords
    })

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    return (
        <>
            {
                data.map((record: {weight: number, type: string}) =>
                    <div key={record.type}> 
                        <div style={{fontWeight: "bold"}}>{record.type.substring(0, 1).toUpperCase() + record.type.substring(1)}</div>
                        <RecordChanger type={record.type} initWeight={record.weight} />
                        <br />
                    </div>
                )
            }
        </>
    )
}

export default ProfileRecords
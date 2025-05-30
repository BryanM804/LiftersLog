import { useQuery } from "@tanstack/react-query"
import getUserRecords from "../api/getUserRecords"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"
import RecordChanger from "./RecordChanger"

type ProfileRecordsProps = {
    editable?: boolean;
    username?: string;
}


function ProfileRecords({ editable, username }: ProfileRecordsProps) {

    const { data, error, isLoading} = useQuery({
        queryKey: ["records", username],
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
                        {
                            editable ?
                                <RecordChanger type={record.type} initWeight={record.weight} />
                            :
                                record.weight > 0 ? record.weight : "N/A"
                        }
                        <br />
                    </div>
                )
            }
        </>
    )
}

export default ProfileRecords
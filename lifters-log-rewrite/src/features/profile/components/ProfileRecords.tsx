import { useQuery } from "@tanstack/react-query"
import getUserRecords from "../api/getUserRecords"
import Loading from "../../../components/Loading"
import ServerError from "../../../components/ServerError"


function ProfileRecords() {

    const { data, error, isLoading} = useQuery({
        queryKey: ["records"],
        queryFn: getUserRecords
    })

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    console.log(data);

    return (
        <>

        </>
    )
}

export default ProfileRecords
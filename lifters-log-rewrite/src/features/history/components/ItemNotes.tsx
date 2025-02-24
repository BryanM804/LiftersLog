import { useQuery } from "@tanstack/react-query"
import getNotesForMovement from "../api/getNotesForMovement";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";

type ItemNotesProps = {
    movement: string;
    date: string;
}

type Note = {
    text: string;
    noteid: number;
}

function ItemNotes({ movement, date }: ItemNotesProps) {

    const { data, error, isLoading } = useQuery({
        queryKey: ["notes", "history", {movement, date}],
        queryFn: () => getNotesForMovement(movement, date)
    });

    if (isLoading) {
        return <Loading />
    }
    if (error) {
        return <ServerError error={error} />
    }

    if (data.length > 0) {
        return (
            <div>
                <div style={{fontWeight: "bold"}}>Notes:</div>
                <ul style={{padding: 0, position: "relative", left: "1.2rem", top: 0, margin: 0}}>
                    {
                        data.map((data: Note) =>
                            <li key={data.noteid}>{data.text}</li>
                        )
                    }
                </ul>
            </div>
        )
    } else {
        return <></>
    }
}

export default ItemNotes
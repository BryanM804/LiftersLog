import { useQuery } from "@tanstack/react-query"
import getNotesForMovement from "../api/getNotesForMovement";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import { useDate } from "../contexts/DateContextProvider";

type ItemNotesProps = {
    movement: string;
}

type Note = {
    text: string;
    noteid: number;
}

function ItemNotes({ movement }: ItemNotesProps) {

    const { historyDate } = useDate()

    const { data, error, isLoading } = useQuery({
        queryKey: ["notes", "history", movement, historyDate.toDateString()],
        queryFn: getNotesForMovement
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
                <ul className="historyNotes">
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
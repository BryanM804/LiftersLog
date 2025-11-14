import { useMovement } from "../contexts/MovementContextProvider";
import Note from "./Note";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getNotesForMovement from "../api/getNotesForMovement";
import AddNoteButton from "./AddNoteButton";
import ServerError from "../../../components/ServerError";
import useDebounce from "../../../hooks/useDebounce";
import { useDate } from "../../history/contexts/DateContextProvider";
import { useEffect } from "react";

type Note = {
    text: string;
    noteid: number;
}

function NoteSection() {

    const queryClient = useQueryClient();
    const { movement } = useMovement();
    const { historyDate } = useDate()
    const debouncedMovement = useDebounce(movement, 300);
    
    const { data, error, isLoading } = useQuery({
        queryKey: ["notes", debouncedMovement, historyDate.toDateString()],
        queryFn: getNotesForMovement
    })

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["notes"], exact: false })
    }, [historyDate])

    return (
        <div className="noteSection">
            <div style={{gridColumn: "span 3", position: "relative"}}>
                <AddNoteButton />
                <h3 style={{padding: 0, margin: 0}}>Notes </h3>
                <hr />
            </div>
            { 
                error ? <div className="recentHistorySpan"><ServerError error={error} /></div>
                :
                (data == null || data.length <= 0 || isLoading) ?
                <div className="recentHistorySpan darkFont" style={{ marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                    Sticky notes or notes you have added to a movement for today will appear here.
                </div>
                :
                (data != null) &&
                <ul style={{gridColumn: "span 3"}}>
                    {
                    data.map((note: Note) => 
                        <Note text={note.text} key={note.noteid} noteid={note.noteid}/>
                    )
                    }
                </ul>
            }
        </div>
    )
}

export default NoteSection;
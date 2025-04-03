import { useMovement } from "../contexts/MovementContextProvider";
import Note from "./Note";
import { useQuery } from "@tanstack/react-query";
import getNotesForMovement from "../api/getNotesForMovement";
import AddNoteButton from "./AddNoteButton";
import ServerError from "../../../components/ServerError";
import { useEffect, useRef, useState } from "react";

type Note = {
    text: string;
    noteid: number;
}

function NoteSection() {

    const { movement } = useMovement();
    const [queryNotes, setQueryNotes] = useState(false);
    const timerRef = useRef<number | null>(null);
    
    const { data, error, isLoading } = useQuery({
        queryKey: ["notes", movement],
        queryFn: () => getNotesForMovement(movement),
        enabled: queryNotes
    })

    // Originally meant to fix flickering on every character change (fixed another way)
    // Leaving it because it will still reduce server traffic
    useEffect(() => {
        setQueryNotes(false)
        if (timerRef.current)
            clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            setQueryNotes(true)
        }, 350)
    }, [movement])

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
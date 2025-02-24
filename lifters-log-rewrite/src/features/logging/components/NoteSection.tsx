import { useMovement } from "../contexts/MovementContextProvider";
import Note from "./Note";
import { useQuery } from "@tanstack/react-query";
import getNotesForMovement from "../api/getNotesForMovement";
import AddNoteButton from "./AddNote";

type Note = {
    text: string;
    noteid: number;
}

function NoteSection() {

    const { movement } = useMovement();
    
    const { data, error, isLoading } = useQuery({
        queryKey: ["notes", movement],
        queryFn: () => getNotesForMovement(movement)
    })

    return (
        <div className="noteSection">
            <div style={{gridColumn: "span 3", position: "relative"}}>
                <AddNoteButton />
                <h3 style={{padding: 0, margin: 0}}>Notes </h3>
                <hr />
            </div>
            { (!error && !isLoading && (data == null || data.length <= 0)) && 
            <div className="recentHistorySpan darkFont" style={{ marginLeft: "0.5rem", marginRight: "0.5rem"}}>Sticky notes or notes you have added to a movement for today will appear here.</div> }
            <ul style={{gridColumn: "span 3"}}>
                { isLoading && <li>Loading...</li>}
                { error && <li>Server error occured</li>}
                {
                    (!error && !isLoading && data != null) &&
                    data.map((note: Note) => 
                        <Note text={note.text} key={note.noteid} noteid={note.noteid}/>
                    )
                }
            </ul>
        </div>
    )
}

export default NoteSection;
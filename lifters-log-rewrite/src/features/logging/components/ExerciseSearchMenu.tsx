import { ChangeEvent, useEffect, useRef, useState } from "react";
import SlideUpMenu from "../../../components/SlideUpMenu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NewExerciseMenu from "./NewExerciseMenu";
import getSearchableMovements from "../api/getSearchableMovements";
import Fuse from "fuse.js";

type ExerciseSearchMenuProps = {
    onCancel: () => void;
}

type SearchedExerciseDetailsProps = {
    name: string;
    description: string;
    exerciseid: number;
}

function SearchedExerciseDetails() {
    
    
    return (
        <div
            style={{
                display: "flex",
            }}
        >
            
        </div>
    )
}

function ExerciseSearchMenu({ onCancel }: ExerciseSearchMenuProps) {

    const fuseRef = useRef(new Fuse([], {
        includeScore: true,
        threshold: 0.4
    }))

    const queryClient = useQueryClient();

    const [creatingMovement, setCreatingMovement] = useState(false)
    const [criteria, setCriteria] = useState("");
    const [searchText, setSearchText] = useState("")
    const [displayedExerciseList, setDisplayedExerciseList] = useState([])

    const { data: movements, error, isLoading } = useQuery({
         queryKey: ["movements", criteria],
         queryFn: getSearchableMovements
    });

    function closeAll() {
        setCreatingMovement(false)
        onCancel()
    }

    function changeSearchText(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.id === "exerciseSearchInput") {
            setSearchText(e.target.value)
        }
    }

    function changeCriteria(newCriteria: string) {
        setCriteria(newCriteria)
        queryClient.invalidateQueries({ queryKey: ["movements"], exact: false, refetchType: "all" })
    }

    function searchList() {
        const searchResults = fuseRef.current.search(searchText)
        
        const displayResults = searchResults.map((result) => result.item)

        setDisplayedExerciseList(displayResults)
    }

    useEffect(() => {
        if (movements) {
            const movementNames = movements.map((movement: {movement: string, exerciseid: number}) => movement.movement)
            fuseRef.current.setCollection(movementNames)
            searchList()
        }
    }, [movements])

    useEffect(() => {
        searchList()
    }, [searchText])

    if (creatingMovement) {
        return (
            <>
                <NewExerciseMenu
                    onCancel={closeAll}
                >
                </NewExerciseMenu>
            </>
        )
    }

    return (
        <>
            <SlideUpMenu
                onCancel={onCancel}
            >
                <button
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        fontSize: "1.5rem"
                    }}
                    onClick={() => setCreatingMovement(true)}
                >
                    +
                </button>
                <input 
                    id="exerciseSearchInput"
                    type="text"
                    className="smallTextInput"
                    value={searchText}
                    onChange={changeSearchText}
                    style={{
                        margin: "0.5rem",
                        width: "60%"
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: "1rem"
                    }}
                >
                    Sort by: 
                    <button
                        className="smallFloatingButton"
                        onClick={() => changeCriteria("recent")}
                    >
                        Recent
                    </button>
                    {
                        // Add a filter mechanism in the future to select muscle groups to filter by
                    /* <button>
                        Muscle Group
                    </button> */
                    }
                    <button
                        className="smallFloatingButton"
                        onClick={(() => changeCriteria("most"))}
                    >
                        Most Logged
                    </button>
                </div>
                <div
                    style={{
                        height: "64vh",
                        width: "100%",
                        overflowY: "auto"
                    }}
                >
                    <ul
                        style={{
                            listStyle: "none",
                            margin: "0",
                            padding: "0",
                            height: "40%",
                            maxHeight: "40%"
                        }}
                    >
                        {
                            displayedExerciseList.map(exerciseName => (
                                <li 
                                    className="searchableMovementItem"
                                    key={exerciseName}
                                >
                                    {exerciseName}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </SlideUpMenu>
        </>
    )
}

export default ExerciseSearchMenu;
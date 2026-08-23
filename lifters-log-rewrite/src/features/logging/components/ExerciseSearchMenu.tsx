import { ChangeEvent, useState } from "react";
import SlideUpMenu from "../../../components/SlideUpMenu";
import getMovements from "../api/getMovements";
import { useQuery } from "@tanstack/react-query";
import NewExerciseMenu from "./NewExerciseMenu";

type ExerciseSearchMenuProps = {
    onCancel: () => void;
}

function ExerciseSearchMenu({ onCancel }: ExerciseSearchMenuProps) {

    const [creatingMovement, setCreatingMovement] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [displayedExerciseList, setDisplayedExerciseList] = useState([])

    // const { data: movements, error, isLoading } = useQuery({
    //     queryKey: ["movements"],
    //     queryFn: getMovements
    // });

    function closeAll() {
        setCreatingMovement(false)
        onCancel()
    }

    function changeSearchText(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.id === "exerciseSearchInput") {
            setSearchText(e.target.value)
        }
    }

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
                    <button>
                        Recent
                    </button>
                    <button>
                        Muscle Group
                    </button>
                    <button>
                        Most Logged
                    </button>
                </div>
            </SlideUpMenu>
        </>
    )
}

export default ExerciseSearchMenu;
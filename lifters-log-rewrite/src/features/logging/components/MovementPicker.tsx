import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useMovement } from "../contexts/MovementContextProvider";

type MovementPickerProps = {
    changeSplit: (newBool: boolean) => void
}


function MovementPicker({ changeSplit }: MovementPickerProps) {

    const { movement, setMovement } = useMovement();

    // const [movements, setMovements] = useState([{
    //     "movement": "",
    //     "id": 0
    // }])

    // Placeholder until the api is set up
    const [movements, setMovements] = useState([{
        "movement": "Barbell Bench Press",
        "id": 1
    },
    {
        "movement": "Lat Pulldown",
        "id": 2
    },
    {
        "movement": "Hammer Strength Machine High Row",
        "id": 3
    }]);
    const [splitMovements, setSplitMovements] = useState(["Hammer Strength Machine High Row"])

    // Load movements from database
    // useEffect

    function handleMovementChange(e: ChangeEvent<HTMLInputElement>) {
        setMovement(e.target.value);
        if (splitMovements.indexOf(e.target.value) != -1) {
            changeSplit(true)
        } else {
            changeSplit(false)
        }
    }
    function clearText(e: SyntheticEvent) {
        // Not sure why you need to prevent default on a plain button
        e.preventDefault();
        setMovement("")
        changeSplit(false)
    }

    return (
        <>
            <datalist id="movementList">
                {movements.map((movement) => 
                    <option value={movement.movement} key={movement.id}/>
                )}
            </datalist>
            <label htmlFor="movement">Exercise</label>
            <br />
            <input type="text" className="longTextInput" id="movement" autoComplete="on" list="movementList" onChange={handleMovementChange} value={movement} />
            <button className="smallFloatingButton" onClick={clearText}>❌</button>
        </>
    )
}

export default MovementPicker;
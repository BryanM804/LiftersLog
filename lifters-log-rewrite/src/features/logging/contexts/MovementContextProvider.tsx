import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type MovementContextType = {
    movement: string;
    exerciseid: number;
    reps: number;
    subReps: number;
    weight: number;
    subWeight: number;
    inLibrary: boolean;
    setMovement: Dispatch<SetStateAction<string>>;
    setExerciseId: Dispatch<SetStateAction<number>>;
    setReps: Dispatch<SetStateAction<number>>;
    setSubReps: Dispatch<SetStateAction<number>>;
    setWeight: Dispatch<SetStateAction<number>>;
    setSubWeight: Dispatch<SetStateAction<number>>;
}

type MovementContextProviderProps = {
    children: ReactNode;
}

const MovementContext = createContext<MovementContextType | undefined>(undefined)

function MovementContextProvider({ children }: MovementContextProviderProps) {

    const [movement, setMovement] = useState("");
    const [exerciseid, setExerciseId] = useState(0);
    const [reps, setReps] = useState(0)
    const [subReps, setSubReps] = useState(0)
    const [weight, setWeight] = useState(0.0)
    const [subWeight, setSubWeight] = useState(0.0)
    const [inLibrary, setInLibrary] = useState(false)

    useEffect(() => {
        if (exerciseid && exerciseid > 0) {
            setInLibrary(true)
        } else {
            setInLibrary(false)
        }
    }, [exerciseid])

    return (
        <MovementContext.Provider value={{
            movement, 
            setMovement,
            exerciseid,
            setExerciseId, 
            reps, 
            setReps, 
            subReps, 
            setSubReps, 
            weight, 
            setWeight, 
            subWeight, 
            setSubWeight,
            inLibrary
        }}>
            {children}
        </MovementContext.Provider>
    )
}

export function useMovement(): MovementContextType {
    const context = useContext(MovementContext);
    if (!context) {
        throw new Error("useMovement must be used within a MovementProvider");
    }
    return context;
}

export default MovementContextProvider;
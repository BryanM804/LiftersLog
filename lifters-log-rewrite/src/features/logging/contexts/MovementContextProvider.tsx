import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type MovementContextType = {
    movement: string;
    reps: number;
    subReps: number;
    weight: number;
    subWeight: number;
    setMovement: Dispatch<SetStateAction<string>>;
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
    const [reps, setReps] = useState(0)
    const [subReps, setSubReps] = useState(0)
    const [weight, setWeight] = useState(0.0)
    const [subWeight, setSubWeight] = useState(0.0)

    return (
        <MovementContext.Provider value={{
            movement, 
            setMovement, 
            reps, 
            setReps, 
            subReps, 
            setSubReps, 
            weight, 
            setWeight, 
            subWeight, 
            setSubWeight
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
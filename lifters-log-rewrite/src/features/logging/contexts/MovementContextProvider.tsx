import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type MovementContextType = {
    movement: string;
    setMovement: Dispatch<SetStateAction<string>>;
}

interface MovementContextProviderProps {
    children: ReactNode
}

const MovementContext = createContext<MovementContextType | undefined>(undefined)

function MovementContextProvider({ children }: MovementContextProviderProps) {

    const [movement, setMovement] = useState("");

    return (
        <MovementContext.Provider value={{movement, setMovement}}>
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
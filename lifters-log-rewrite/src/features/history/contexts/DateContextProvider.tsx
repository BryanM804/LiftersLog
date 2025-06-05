import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type DateContextType = {
    historyDate: Date;
    stickyDate: boolean;
    setStickyDate: Dispatch<SetStateAction<boolean>>;
    setHistoryDate: Dispatch<SetStateAction<Date>>;
}

type DateContextProviderProps = {
    children: ReactNode
}

const DateContext = createContext<DateContextType | undefined>(undefined)

function DateContextProvider({ children }: DateContextProviderProps) {

    // Would have used date as the name but setDate is already a function of Date objects
    // would rather make things more readable
    const [historyDate, setHistoryDate] = useState(new Date());
    const [stickyDate, setStickyDate] = useState(false)

    return (
        <DateContext.Provider value={{
            historyDate,
            stickyDate,
            setStickyDate,
            setHistoryDate
        }}>
            {children}
        </DateContext.Provider>
    )
}

export function useDate(): DateContextType {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error("useDate must be used within a DateProvider");
    }
    return context;
}

export default DateContextProvider;
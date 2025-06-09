import { useQuery } from "@tanstack/react-query";
import ServerError from "../../../components/ServerError";
import getCardioHistory from "../api/getCardioHistory";
import CardioSet from "../../../types/CardioSet";
import CardioHistory from "./CardioHistory";
import { useEffect } from "react";
import { useDate } from "../contexts/DateContextProvider";

type CardioListProps = {
    setPlaceholderText?: (s: string) => void;
}

function CardioList({ setPlaceholderText }: CardioListProps) {

    const { historyDate } = useDate()

    const { data, error } = useQuery({
        queryKey: ["history", "cardio", historyDate.toDateString()],
        queryFn: getCardioHistory
    })

    useEffect(() => {
        if (data && data.length > 0)
            setPlaceholderText?.("")
    }, [data])

    if (error) return <ServerError error={error} />

    if (data) return (
        <>
            {
                (data.length > 0) && 
                data.map((cardioHistory: CardioSet) => 
                    <CardioHistory 
                        movement={cardioHistory.movement}
                        time={cardioHistory.cardiotime}
                        distance={cardioHistory.distance}
                        note={cardioHistory.note}
                        key={cardioHistory.cardioid}
                        cardioid={cardioHistory.cardioid}
                    />
                )
            }
        </>
    )

    return <></>
}

export default CardioList;
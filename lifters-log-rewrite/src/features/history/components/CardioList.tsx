import { useQuery } from "@tanstack/react-query";
import ServerError from "../../../components/ServerError";
import getCardioHistory from "../api/getCardioHistory";
import CardioSet from "../../../types/CardioSet";
import CardioHistory from "./CardioHistory";
import { useEffect } from "react";

type CardioListProps = {
    date: string;
    setPlaceholderText?: (s: string) => void;
}

function CardioList({ date, setPlaceholderText }: CardioListProps) {

    const { data, error, isLoading } = useQuery({
        queryKey: ["history", "cardio", date],
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
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useMovement } from "../../logging/contexts/MovementContextProvider"
import { ChangeEvent, useEffect, useState } from "react"
import { useDate } from "../contexts/DateContextProvider"
import ToggleSwitch from "../../../components/ToggleSwitch"
import getFilteredDates from "../api/getFilteredDates"


function FilterDatesButton() {

    const { movement } = useMovement()
    const queryClient = useQueryClient()
    const { setSelectableDates, setSelectedIndex, historyDate } = useDate()

    const [filteringDates, setFilteringDates] = useState(false)
    const [filteredMovement, setFilteredMovement] = useState("")

    const { data } = useQuery({
        queryKey: ["filteredDates", movement],
        queryFn: getFilteredDates,
        staleTime: Infinity,
        enabled: filteringDates
    })

    function reset() {
        console.log("Unrestricting dates")
        setFilteredMovement("")
        setSelectableDates(null)
        setSelectedIndex(-1)
    }

    function filterDates(e: ChangeEvent<HTMLInputElement>) {
        const filtering = e.target.checked
        setFilteringDates(filtering)
        if (filtering) {
            setFilteredMovement(movement)
            queryClient.invalidateQueries({ queryKey: ["filteredDates"], exact: false })
        } else {
            reset()
        }
    }

    useEffect(() => {
        if (filteringDates && filteredMovement != movement) {
            setFilteringDates(false)
            setFilteredMovement("")
            console.log("reset")
        }
    }, [movement])

    useEffect(() => {
        if (data && filteringDates) {
            console.log("Restricting dates")
            setSelectableDates(data)
            const activeIndex = data.indexOf(historyDate.toLocaleDateString())
            if (activeIndex > -1)
                setSelectedIndex(activeIndex)
            else
                setSelectedIndex(data.length)
        } else {
            console.log("Unrestricting dates")
            setSelectableDates(null)
            setSelectedIndex(-1)
        }
    }, [data, filteringDates])

    if (movement == "") return <></>

    return (
        <>
            <ToggleSwitch 
                offLabel={`Filter Dates for ${movement}`} 
                onLabel={`Filtering Dates for ${movement}`}
                initialState={filteringDates} 
                onChange={filterDates}/>
        </>
    )
}

export default FilterDatesButton
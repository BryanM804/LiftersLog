import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import getLabelForDate from "../api/getLabelForDate";
import createNewLabel from "../api/createNewLabel";
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import { Tooltip } from "react-tooltip";

type HistoryLabelProps = {
    date: string;
}

function HistoryLabel({ date }: HistoryLabelProps) {

    const [changingLabel, setChangingLabel] = useState(false);
    const [newLabel, setNewLabel] = useState("");
    const queryClient = useQueryClient();

    const { data, error, isLoading} = useQuery({
        queryKey: ["label",  date],
        queryFn: () => getLabelForDate(date)
    });

    const labelMutation = useMutation({
        mutationFn: createNewLabel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["label"] });
            setChangingLabel(false);
        }
    });

    if (isLoading) {
        return (
            <h3 id="currentLabel" className="historyLabel">
                    <Loading />
            </h3>
        )
    }

    if (error) {
        return (
            <h3 id="currentLabel" className="historyLabel">
                    <ServerError error={error} />
            </h3>
        )
    }

    function handleLabelSubmit(e: SyntheticEvent) {
        e.preventDefault();
        labelMutation.mutate({label: newLabel, date: date});
    }

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        setNewLabel(e.target.value);
    }

    return (
        <>
            {
                changingLabel ? 
                <form>
                    <input type="text" className="smallTextInput" value={newLabel} onChange={handleTextChange}/>
                    <br />
                    <input type="submit" className="smallFloatingButton" value="✅" onClick={handleLabelSubmit}/>
                    <button onClick={() => setChangingLabel(false)} className="smallFloatingButton">Cancel</button>
                </form>
                :
                <h3 id="currentLabel" 
                    className="historyLabel" 
                    data-tooltip-id="historyLabel" 
                    onClick={() => setChangingLabel(true)}
                    >
                    <Tooltip place="top" content="Tap here to create a custom label for the day." id="historyLabel"/>
                    {data == null || data.label == "None" ? date : data.label}
                </h3>
            }
        </>
    )
}

export default HistoryLabel;
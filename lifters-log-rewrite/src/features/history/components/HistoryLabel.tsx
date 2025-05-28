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
        queryFn: getLabelForDate
    });

    const labelMutation = useMutation({
        mutationFn: createNewLabel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["label"] });
            setChangingLabel(false);
            setNewLabel("")
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

    function handleChangeLabelClick() {
        setChangingLabel(true)
        setNewLabel(data.label)
    }

    function handleCancelLabelChange() {
        setChangingLabel(false)
        // Set new label to empty in case the user changes the date and changes the label on another date
        setNewLabel("")
    }

    return (
        <>
            {
                changingLabel ? 
                <form>
                    <input type="text" className="labelChangeInput" value={newLabel} onChange={handleTextChange}/>
                    <br />
                    <input type="submit" className="smallFloatingButton" value="Save" onClick={handleLabelSubmit}/>
                    <button onClick={handleCancelLabelChange} className="smallFloatingButton">Cancel</button>
                </form>
                :
                <h3 id="currentLabel" 
                    className="historyLabel" 
                    data-tooltip-id="historyLabel" 
                    onClick={handleChangeLabelClick}
                    >
                    <Tooltip place="top" content="Tap here to create a custom label for the day." id="historyLabel"/>
                    {data == null || data.label == "None" ? date : data.label}
                </h3>
            }
        </>
    )
}

export default HistoryLabel;
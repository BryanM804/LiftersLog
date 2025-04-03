import { useMutation, useQuery } from "@tanstack/react-query"
import setPreferences from "../api/setPreferences"
import getUserPreferences from "../api/getUserPreferences"
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import { useEffect, useState } from "react";


function PreferenceMenu() {

    const [noteActivity, setNoteActivity] = useState(true)
    const [logActivity, setLogActivity] = useState(true)
    const [labelActivity, setLabelActivity] = useState(true)
    const [splitsMovements, setSplitsMovements] = useState(true)

    const { data, error, isLoading } = useQuery({
        queryKey: ["preferences"],
        queryFn: getUserPreferences
    });

    const preferenceMutation = useMutation({
        mutationFn: setPreferences
    })

    useEffect(() => {
        if (data) {
            setNoteActivity(data.noteActivity);
            setLogActivity(data.logActivity);
            setLabelActivity(data.labelActivity);
            setSplitsMovements(data.splitsMovements)
        }
    }, [data])

    function handleSubmit() {

    }

    if (isLoading) return <Loading />
    if (error) return <ServerError error={error} />

    // Placeholder to test querying
    return (
        <div className="preferenceMenu">
            <p>Note Activity: {noteActivity.toString()}</p>
            <p>Log Activity: {logActivity.toString()}</p>
            <p>Label Activity: {labelActivity.toString()}</p>
            <p>Splits Movements: {splitsMovements.toString()}</p>
        </div>
    )
}

export default PreferenceMenu
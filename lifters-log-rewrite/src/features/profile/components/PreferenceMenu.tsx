import { useMutation, useQuery } from "@tanstack/react-query"
import setPreferences from "../api/setPreferences"
import getUserPreferences from "../api/getUserPreferences"
import Loading from "../../../components/Loading";
import ServerError from "../../../components/ServerError";
import { useEffect, useState } from "react";
import ToggleSwitch from "../../../components/ToggleSwitch";
import HalfGap from "../../../components/HalfGap";

type PreferenceMenuProps = {
    noteActivity: boolean;
    logActivity: boolean;
    labelActivity: boolean;
    splitsMovements: boolean;
    onChange: (e: string) => void;
}

function PreferenceMenu({ noteActivity, logActivity, labelActivity, splitsMovements, onChange }: PreferenceMenuProps) {

    return (
        <div className="preferenceMenu">
            Preferences
            <hr />
            <ToggleSwitch label="Note Activity" 
                initialState={noteActivity}
                onChange={() => onChange("noteActivity")}
                />
            <HalfGap />
            <ToggleSwitch label="Log Activity" 
                initialState={logActivity}
                onChange={() => onChange("logActivity")}
                />
            <HalfGap />
            <ToggleSwitch label="Label Activity" 
                initialState={labelActivity}
                onChange={() => onChange("labelActivity")}
                />
            <HalfGap />
            <ToggleSwitch label="Split Movements" 
                initialState={splitsMovements}
                onChange={() => onChange("splitsMovements")}
                />
        </div>
    )
}

export default PreferenceMenu
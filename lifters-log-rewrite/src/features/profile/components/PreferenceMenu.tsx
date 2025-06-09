import ToggleSwitch from "../../../components/ToggleSwitch";
import HalfGap from "../../../components/HalfGap";

type PreferenceMenuProps = {
    noteActivity: boolean;
    logActivity: boolean;
    labelActivity: boolean;
    splitsMovements: boolean;
    xpAnimation: boolean;
    liftRecords: boolean;
    onChange: (e: string) => void;
}

function PreferenceMenu({ noteActivity, logActivity, labelActivity, splitsMovements, xpAnimation, liftRecords, onChange }: PreferenceMenuProps) {

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
            <HalfGap />
            <ToggleSwitch label="XP Animation" 
                initialState={xpAnimation}
                onChange={() => onChange("xpAnimation")}
                />
            <HalfGap />
            <ToggleSwitch label="Show Friends Lift Records" 
                initialState={liftRecords}
                onChange={() => onChange("liftRecords")}
                />
        </div>
    )
}

export default PreferenceMenu
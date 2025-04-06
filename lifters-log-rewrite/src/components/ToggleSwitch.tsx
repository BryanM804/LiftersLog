import { ChangeEvent, useState } from "react";
import "../styles/toggleSwitch.css"

type ToggleSwitchProps = {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    offLabel?: string;
    onLabel?: string;
}

function ToggleSwitch({ onChange, label, offLabel, onLabel }: ToggleSwitchProps) {
    
    const [toggled, setToggled] = useState(false);

    const toggle = (e: ChangeEvent<HTMLInputElement>) => {
        setToggled(!toggled)
        if (onChange) onChange(e);
    }

    return (
        <div style={{display: "flex", alignItems: "center"}}>
        <label className="switch" >
            <input type="checkbox" checked={toggled} onChange={toggle} />
            <div className="switchSlider"></div>
        </label>
        {
            (onLabel && offLabel) ?
                <span style={{marginLeft: "0.25rem"}}>{ toggled ? onLabel : offLabel}</span>
            :
            label &&
                <span style={{marginLeft: "0.25rem"}}>{label}</span>
        }
        </div>
    )
}

export default ToggleSwitch;
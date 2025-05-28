import { ChangeEvent, useEffect, useState } from "react";
import "../styles/toggleSwitch.css"

type ToggleSwitchProps = {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    offLabel?: string;
    onLabel?: string;
    type?: string;
    initialState?: boolean;
}

function ToggleSwitch({ onChange, label, offLabel, onLabel, type, initialState }: ToggleSwitchProps) {
    
    const [toggled, setToggled] = useState(false);

    // Setting initial state in the useState was causing issues
    useEffect(() => {
        if (initialState != undefined)
            setToggled(initialState)
    }, [initialState])

    const toggle = (e: ChangeEvent<HTMLInputElement>) => {
        setToggled(!toggled)
        if (onChange) onChange(e);
    }

    return (
        <div style={{display: "flex", alignItems: "center"}}>
        <label className={`switch ${type === "dark" ? "darkSwitch" : ""}`} >
            <input type="checkbox" checked={toggled} onChange={toggle} />
            <div className={`switchSlider ${type === "dark" ? "darkSwitchSlider" : ""}`}></div>
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
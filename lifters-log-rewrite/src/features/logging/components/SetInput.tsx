import { ChangeEvent, useEffect } from "react";
import { useMovement } from "../contexts/MovementContextProvider";
import useDebounce from "../../../hooks/useDebounce";

type SetInputProps = {
    type: "weight" | "rep" | "subWeight" | "subRep";
    id: string;
    syncedInputs: boolean;
    splitMovement: boolean;
    className?: string;
    labeled?: boolean;
    placeholder?: string;
}

function SetInput({ type, id, syncedInputs, splitMovement, className, labeled, placeholder }: SetInputProps) {

    const { movement, weight, reps, subWeight, subReps, setWeight, setReps, setSubWeight, setSubReps } = useMovement();
    const debouncedMovement = useDebounce(movement, 150);
    
    let value;
    let maxValue;
    switch (type) {
        case "weight":
            value = weight;
            maxValue = 1500;
            break;
        case "rep":
            value = reps;
            maxValue = 50;
            break;
        case "subWeight":
            value = subWeight;
            maxValue = 1500;
            break;
        case "subRep":
            value = subReps;
            maxValue = 50;
            break;
    }
    const displayValue = (value == 0 || value == 0.0) ? "" : value

    useEffect(() => {
        const savedValue = localStorage.getItem(`${debouncedMovement}${type}`);

        if (savedValue) {
            switch (type) {
                case "weight":
                    setWeight(parseAndRound(savedValue))
                    break;
                case "rep":
                    setReps(parseInt(savedValue))
                    break;
                case "subWeight":
                    setSubWeight(parseAndRound(savedValue))
                    break;
                case "subRep":
                    setSubReps(parseInt(savedValue));
                    break;
            }
        }
    }, [debouncedMovement])

    function parseAndRound(s: string) {
        if (s.length === 0) {
            return 0.0
        }

        return parseFloat(parseFloat(s).toFixed(2));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const id = e.target.id
        const input = e.target.value

        if (id === "repInput") {
            const val = input.length === 0 ? 0 : parseInt(input)
            setReps(val)
            if (splitMovement && syncedInputs)
                setSubReps(val)
        } else if (id === "subRepInput") {
            const val = input.length === 0 ? 0 : parseInt(input)
            setSubReps(val)
            if (splitMovement && syncedInputs)
                setReps(val)
        } else if (id === "weightInput") {
            const val = parseAndRound(input)
            setWeight(val)
            if (splitMovement && syncedInputs)
                setSubWeight(val)
        } else if (id === "subWeightInput") {
            const val = parseAndRound(input)
            setSubWeight(val)
            if (splitMovement && syncedInputs)
                setWeight(val)
        }

    }

    return (
        <div style={{flex: 1}}>
            <label htmlFor={id}>{labeled && (type == "rep" || type == "subRep" ? "Reps" : "Weight")}
                { labeled ? <br /> : <></> }
                <input 
                    id={id} 
                    onChange={handleChange} 
                    type="number" 
                    className={`smallTextInput setInput ${className ? className : ""}`}
                    value={displayValue} 
                    min={0} 
                    max={maxValue}
                    placeholder={placeholder && placeholder}
                />
            </label>
        </div>
    )
}

export default SetInput;
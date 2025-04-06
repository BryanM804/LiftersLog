import { ChangeEvent } from "react";

type SetInputProps = {
    type: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    value: number;
}

function SetInput({ type, onChange, id, value }: SetInputProps) {
    const displayValue = (value == 0 || value == 0.0) ? "" : value

    return (
        <>
            <label htmlFor={id}>{type == "rep" ? "Reps" : "Weight"}
            </label>
            <br />
            <input id={id} onChange={onChange} type="number" className="smallTextInput setInput" value={displayValue} min={0} max={
                type == "rep" ? 50 : 1500
            }
            />
        </>
    )
}

export default SetInput;
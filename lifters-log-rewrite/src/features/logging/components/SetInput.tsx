import { ChangeEvent } from "react";

type SetInputProps = {
    type: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    side: number;
    value: number;
}

function SetInput({ type, onChange, side, value }: SetInputProps) {

    let id = type == "rep" ? "repInput" : "weightInput"
    id += side

    return (
        <>
            <label htmlFor={id}>{type == "rep" ? "Reps" : "Weight"}
            </label>
            <br />
                <input id={id} onChange={onChange} type="number" className="smallTextInput" value={value} min={0} max={
                    type == "rep" ? 50 : 1500
                }
                />
        </>
    )
}

export default SetInput;
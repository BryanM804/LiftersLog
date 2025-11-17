import { Dispatch, SetStateAction } from "react";
import upArrow from "../../../assets/UpArrow.png"
import downArrow from "../../../assets/DownArrow.png"

type FocusValueChangerProps = {
    focused?: boolean;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    amount: number;
}

function FocusValueChanger({ focused, value, setValue, amount }: FocusValueChangerProps) {

    function changeValue() {
        if (value + amount >= 0) {
            setValue(value + amount)
        }
    }

    if (!focused) return

    return (
        <div onClick={changeValue}>
            {
                amount > 0 ?
                <img src={upArrow} height={32} width={32} />
                :
                <img src={downArrow} height={32} width={32} />
            }
        </div>
    )
}

export default FocusValueChanger;
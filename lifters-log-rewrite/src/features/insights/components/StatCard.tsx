import { useEffect, useState } from "react";

type StatCardProps = {
    title: string;
    value: string;
    subValue?: string;
}

const DECMIAL_PLACES = 2

function parseAndRound(s: string) {
    if (s.length === 0) {
        return 0.0
    }

    return parseFloat(parseFloat(s).toFixed(DECMIAL_PLACES));
}

function StatCard({ title, value, subValue }: StatCardProps) {

    const [roundedValue, setRoundedValue] = useState(value)

    // Rounds any floats in the value to 2 (or whatever DECIMAL_PLACES is)
    useEffect(() => {
        if (typeof value === "string") {
            const valueStrs = value.split(" ")
            let fixedString = "";

            for (let i = 0; i < valueStrs.length; i++) {
                if (Number.isNaN(parseFloat(valueStrs[i]))) {
                    fixedString += valueStrs[i] + " "
                } else {
                    fixedString += parseAndRound(valueStrs[i]).toString() + " "
                }
            }

            setRoundedValue(fixedString.trim())
        }
    }, [value])

    return (
        <>
            <div className="statCard">
                <div style={{width: "100%", textAlign: "center"}}>
                    <p style={{marginBottom: "0", marginTop: "0.4rem"}}>{title}</p>
                    <hr className="darkFont"/>
                </div>
                <div style={{textAlign: "center"}}>
                    <h3 style={{marginBottom: subValue ? "0" : "1rem" }}>{roundedValue}</h3>
                    {
                        subValue &&
                            <h5 style={{marginTop: "0", opacity: "0.6"}}>{subValue}</h5>
                    }
                </div>
            </div>
        </>
    )
}

export default StatCard
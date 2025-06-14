import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import MovementPicker from "./MovementPicker"
import SetInput from "./SetInput"
import LogButton from "./LogButton"
import { useMovement } from "../contexts/MovementContextProvider"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import getSplitMovements from "../api/getSplitMovements"
import getUserPreferences from "../../profile/api/getUserPreferences"
import addNewSet from "../api/addNewSet"
import { XPPARTICLE_DIVISOR } from "../../../utils/constants"
import { useDate } from "../../history/contexts/DateContextProvider"
import getBodyweightMovements from "../api/getBodyweightMovements"

type LogMenuProps = {
    onLogSuccess: (xpParticleMultiplier: number) => void;
}

function LogMenu({ onLogSuccess }: LogMenuProps) {

    // Contexts
    const {
        movement,
        reps,
        subReps,
        weight,
        subWeight,
        setReps,
        setSubReps,
        setWeight,
        setSubWeight
    } = useMovement()
    const queryClient = useQueryClient();
    const { historyDate } = useDate()
    
    // States
    // User split preference will be set from account
    const [userSplits, setUserSplits] = useState(true)
    const [splitMovement, setSplitMovement] = useState(false)
    const [invalidLog, setInvalidLog] = useState(false)
    
    // Queries/Mutations
    const { data: splitMovements } = useQuery({
        queryKey: ["splitMovements"],
        queryFn: getSplitMovements,
        staleTime: Infinity
    });
    const { data: userPreferences } = useQuery({
        queryKey: ["preferences"],
        queryFn: getUserPreferences
    });
    const { data: bodyweightMovements, isLoading: bodyweightLoading, error:bodyweightError } = useQuery({
        queryKey: ["bodyweightMovements"],
        queryFn: getBodyweightMovements
    })
    useEffect(() => {
        if (userPreferences) {
            setUserSplits(userPreferences.splitsMovements)
        }
    }, [userPreferences])
    const setMutation = useMutation({
        mutationFn: addNewSet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["history"], exact: false });
            
            let xpNumber = ((weight * reps) + (subWeight * subReps))
            if (xpNumber <= 0)
                xpNumber = 500
            onLogSuccess(xpNumber / XPPARTICLE_DIVISOR)
        }
    });


    function isSplittableMovement(m: string) {
        if (splitMovements && splitMovements.length) {
            for (const s of splitMovements) {
                if (s.movement == m)
                    return true;
            }
        }
        return false;
    }
    function isBodyweightMovement(m: string) {
        if (bodyweightMovements && bodyweightMovements.length) {
            for (const b of bodyweightMovements) {
                if (b.movement == m)
                    return true
            }
        }
        return false
    }

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
        } else if (id === "subRepInput") {
            const val = input.length === 0 ? 0 : parseInt(input)
            setSubReps(val)
        } else if (id === "weightInput") {
            const val = parseAndRound(input)
            setWeight(val)
        } else if (id === "subWeightInput") {
            const val = parseAndRound(input)
            setSubWeight(val)
        }
    }

    function clearInputs() {
        setWeight(0.0);
        setReps(0);
        setSubReps(0);
        setSubWeight(0.0);
    }

    useEffect(() => {
        if (movement && isSplittableMovement(movement)) {
            // Rare edge case that someone can disable splitting and then tap a split set
            // that would then set the subReps/subWeight without showing it
            if (userSplits || subReps > 0 || subWeight > 0) {
                setSplitMovement(true)
            }
        } else {
            setSplitMovement(false)
            setSubReps(0)
            setSubWeight(0)
        }
    }, [movement, subReps, subWeight])

    // Submission Logic

    function flagInvalidLog() {
        setInvalidLog(true);
        setTimeout(() => {
            setInvalidLog(false);
        }, 200);
    }

    function handleLogSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (reps <= 0 || weight < 0 || reps > 100 || weight > 1500 || movement === "" || (splitMovement && (subReps <= 0 || subWeight <= 0))) {
            flagInvalidLog();
            return;
        }
        // If we passed those but the weight is 0 and not bodyweight
        if ((bodyweightLoading || bodyweightError || !isBodyweightMovement(movement)) && weight == 0) {
            flagInvalidLog();
            return;
        }

        setMutation.mutate({movement: movement, weight: weight, reps: reps, subweight: subWeight, subreps: subReps, date: historyDate.toDateString()});
    }

    return (
        <>
        <form onSubmit={handleLogSubmit} noValidate={true}>
            <div className="logGridContainer">
                <div className="gridItemSpan">
                    <MovementPicker onClear={clearInputs} label="Exercise"/>
                </div>
                {
                    splitMovement && 
                    <>
                        <div className="gridItem" style={{textAlign: "center"}}>Left<hr /></div>
                        <div className="gridItem" style={{textAlign: "center"}}>Right<hr /></div>
                    </>
                }
                <div className="gridItem">
                    <SetInput type="weight" onChange={handleChange} id="weightInput" value={weight}/>
                </div>
                {
                    splitMovement && 
                    <div className="gridItem">
                        <SetInput type="weight" onChange={handleChange} id="subWeightInput" value={subWeight}/>
                    </div>
                }
                <div className="gridItem">
                    <SetInput type="rep" onChange={handleChange} id="repInput" value={reps}/>
                </div>
                {
                    splitMovement && 
                    <div className="gridItem">
                        <SetInput type="rep" onChange={handleChange} id="subRepInput" value={subReps}/>
                    </div>
                }
                <LogButton invalidLog={invalidLog} />
            </div>
        </form>
        </>
    )
}

export default LogMenu
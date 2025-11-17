import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from "react"
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
import SyncButton from "./SyncButton"
import FocusValueChanger from "./FocusValueChanger"

type LogMenuProps = {
    onLogSuccess?: (xpParticleMultiplier?: number) => void;
    focused?: boolean;
}

function LogMenu({ onLogSuccess, focused }: LogMenuProps) {

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
    const [syncedInputs, setSyncedInputs] = useState(false)
    
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
    const setMutation = useMutation({
        mutationFn: addNewSet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["history"], exact: false });
            
            let xpNumber = ((weight * reps) + (subWeight * subReps))
            if (xpNumber <= 0)
                xpNumber = 500
            onLogSuccess?.(xpNumber / XPPARTICLE_DIVISOR)

            localStorage.setItem(`${movement}weight`, weight.toString())
            localStorage.setItem(`${movement}rep`, reps.toString())
            localStorage.setItem(`${movement}subWeight`, subWeight.toString())
            localStorage.setItem(`${movement}subRep`, subReps.toString())
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

    function changeSyncState(e: SyntheticEvent) {
        e.preventDefault();
        if (focused) return;

        // When enabling sync, sync the current inputs. Priority goes to left side if both have text
        if (!syncedInputs) {
            if (reps > 0 ) {
                setSubReps(reps)
            } else if (subReps > 0) {
                setReps(subReps)
            }
            if (weight > 0) {
                setSubWeight(weight)
            } else if (subWeight > 0) {
                setWeight(subWeight)
            }
        }

        localStorage.setItem("syncState", (!syncedInputs).toString());

        setSyncedInputs(!syncedInputs)
    }

    function clearInputs() {
        setWeight(0.0);
        setReps(0);
        setSubReps(0);
        setSubWeight(0.0);
    }

    useEffect(() => {
        if (userPreferences) {
            setUserSplits(userPreferences.splitsMovements)
        }
    }, [userPreferences])

    useEffect(() => {
        if (movement && isSplittableMovement(movement)) {
            // Rare edge case that someone can disable splitting and then tap a split set
            // that would then set the subReps/subWeight without showing it
            if (userSplits || subReps > 0 || subWeight > 0) {
                setSplitMovement(true)

                const syncState = localStorage.getItem("syncState")

                if (syncState && syncState === "true") setSyncedInputs(true)
            }
        } else {
            setSplitMovement(false)
            setSubReps(0)
            setSubWeight(0)
        }
    }, [movement, subReps, subWeight])

    useEffect(() => {
        if (focused && splitMovement) {
            setSubReps(reps)
            setSubWeight(weight)
        }
    }, [reps, weight])

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
            <div className={`logButtonsContainer ${focused ? "focused" : ""}`}>
                <MovementPicker 
                    onClear={clearInputs} 
                    label={`${focused ? "" : "Exercise"}`}
                    placeholder={ focused ? "Exercise" : undefined}    
                />
                {
                    splitMovement ?
                        <>
                            <div className="logFlexRow">
                                <div className={`gridItem ${focused ? "focused" : ""}`} style={{textAlign: "center", flex: 1}}>Left<hr /></div>
                                <div className={`gridItem ${focused ? "focused" : ""}`} style={{textAlign: "center", flex: 1}}>Right<hr /></div>
                            </div>
                            <div style={{position: "relative", width: "100%"}}>
                                <div className={`logFlexRow ${focused ? "focused" : ""}`}>
                                    <SetInput 
                                        className={focused ? "focused" : ""} 
                                        type="weight"
                                        id="weightInput" 
                                        syncedInputs={syncedInputs}
                                        splitMovement={splitMovement}
                                        labeled={!focused}
                                        placeholder={ focused ? "lbs" : undefined}  
                                    />
                                    <SetInput 
                                        className={focused ? "focused" : ""} 
                                        type="subWeight" 
                                        id="subWeightInput" 
                                        syncedInputs={syncedInputs}
                                        splitMovement={splitMovement}
                                        labeled={!focused}
                                        placeholder={ focused ? "lbs" : undefined}
                                    />
                                </div>
                                {
                                    !focused && <SyncButton syncState={syncedInputs} onSyncToggle={changeSyncState} />
                                }
                                <div className={`logFlexRow ${focused ? "focused" : ""}`}>
                                    <SetInput 
                                        className={focused ? "focused" : ""} 
                                        type="rep" 
                                        id="repInput" 
                                        syncedInputs={syncedInputs}
                                        splitMovement={splitMovement}
                                        labeled={!focused}
                                        placeholder={ focused ? "Reps" : undefined}
                                    />
                                    <SetInput 
                                        className={focused ? "focused" : ""} 
                                        type="subRep" 
                                        id="subRepInput" 
                                        syncedInputs={syncedInputs}
                                        splitMovement={splitMovement}
                                        labeled={!focused}
                                        placeholder={ focused ? "Reps" : undefined}
                                    />
                                </div>
                            </div>
                        </>
                    :
                        <>
                            <div className={`logFlexRow ${focused ? "focused" : ""}`}>
                                <div style={{flexDirection: "column"}}>
                                    <FocusValueChanger
                                        focused={focused}
                                        value={weight}
                                        setValue={setWeight}
                                        amount={5}
                                    />
                                    <SetInput 
                                        className={focused ? "focused" : ""} 
                                        type="weight" 
                                        id="weightInput" 
                                        syncedInputs={syncedInputs}
                                        splitMovement={splitMovement}
                                        labeled={!focused}
                                        placeholder={ focused ? "lbs" : undefined}
                                    />
                                    <FocusValueChanger
                                        focused={focused}
                                        value={weight}
                                        setValue={setWeight}
                                        amount={-5}
                                    />
                                </div>
                                <div style={{flexDirection: "column"}}>
                                    <FocusValueChanger
                                        focused={focused}
                                        value={reps}
                                        setValue={setReps}
                                        amount={1}
                                    />
                                    <SetInput 
                                        className={focused ? "focused" : ""} 
                                        type="rep" 
                                        id="repInput" 
                                        syncedInputs={syncedInputs}
                                        splitMovement={splitMovement}
                                        labeled={!focused}
                                        placeholder={ focused ? "Reps" : undefined}
                                    />
                                    <FocusValueChanger
                                        focused={focused}
                                        value={reps}
                                        setValue={setReps}
                                        amount={-1}
                                    />
                                </div>
                            </div>
                        </>
                }
                
                <LogButton invalidLog={invalidLog} className={focused ? "focusedLogButton" : ""}/>
            </div>
        </form>
        </>
    )
}

export default LogMenu
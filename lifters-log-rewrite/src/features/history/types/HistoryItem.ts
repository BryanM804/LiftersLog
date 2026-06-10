type HistoryItem = {
    setid: number;
    Exercise: {movement: string};
    exerciseid: number;
    weight: number;
    reps: number;
    subweight?: number;
    subreps?: number;
    time: string;
    date: string;
}

export default HistoryItem;
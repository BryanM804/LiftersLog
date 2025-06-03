type HistoryItem = {
    setid: number;
    movement: string;
    weight: number;
    reps: number;
    subweight?: number;
    subreps?: number;
    time: string;
    date: string;
}

export default HistoryItem;
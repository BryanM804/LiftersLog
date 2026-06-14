type ActivityEntry = {
    activity_id: number;
    userid: number;
    username: string;
    ref_id: number;
    activity_type: "note" | "lift" | "cardio" | "label";
    title: string;
    subtitle: string;
    date: string;
    time: string;
}

export default ActivityEntry;
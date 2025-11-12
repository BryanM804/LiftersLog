type ChatMessageType = {
    message: string;
    time: string;
    cid: number;
    date: string;
    Account: {username: string};
    ReplyTo?: {message: string, Account: {username: string}};
    LiftReply?: {movement: string, weight: number, reps: number, subweight?: number, subreps?: number, Account: {username: string}};
    NoteReply?: {movement: string, text: string, Account: {username: string}};
    LabelReply?: {label: string, date: Date, Account: {username: string}};
    CardioReply?: {movement: string, cardiotime: number, distance: number, note: string, Account: {username: string}};
    replyType?: "note" | "message" | "label" | "lift" | "cardio" | undefined;
}

export default ChatMessageType
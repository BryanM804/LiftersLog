import XpBar from "../../../components/XpBar";

type ProfileStatsProps = {
    stats: {
        level: number;
        xp: number;
        totalweight: number;
        totalsets: number;
        totalcardiotime: number;
        totalcardiodistance: number;
    }
}

function getCardioDisplayTime(cardioMinutes: number) {
    if (cardioMinutes < 60) {
        return `${cardioMinutes}m`
    } else {
        return `${Math.floor(cardioMinutes / 60)}h ${cardioMinutes % 60}m`
    }
}

function ProfileStats({ stats }: ProfileStatsProps) {

    return (
        <>
        <span style={{fontWeight: "bold"}}>Level {stats.level}</span>
        <XpBar value={stats.xp} max={stats.level * 1500}/>
        <div style={{fontWeight: "bold", textDecoration: "underline"}}>Weight Lifted</div>
        {stats.totalweight} lbs
        <br />
        <div style={{fontWeight: "bold", textDecoration: "underline"}}>Sets Logged</div>
        {stats.totalsets}
        <br />
        <div style={{fontWeight: "bold", textDecoration: "underline"}}>Cardio Time</div>
        {getCardioDisplayTime(stats.totalcardiotime)}
        <br />
        <div style={{fontWeight: "bold", textDecoration: "underline"}}>Cardio Distance</div>
        {stats.totalcardiodistance} Miles
        <br />
        </>
    )
}

export default ProfileStats
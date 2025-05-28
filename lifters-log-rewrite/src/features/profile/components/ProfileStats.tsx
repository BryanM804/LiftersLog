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

function ProfileStats({ stats }: ProfileStatsProps) {

    return (
        <>
        <span style={{fontWeight: "bold"}}>Level {stats.level}</span>
        <br />
        <XpBar value={stats.xp} max={stats.level * 1500}/>
        <div style={{fontWeight: "bold"}}>Weight Lifted</div>
        {stats.totalweight}
        <br />
        <div style={{fontWeight: "bold"}}>Sets Logged</div>
        {stats.totalsets}
        <br />
        <div style={{fontWeight: "bold"}}>Cardio Time</div>
        {stats.totalcardiotime}
        <br />
        <div style={{fontWeight: "bold"}}>Cardio Distance</div>
        {stats.totalcardiodistance}
        <br />
        </>
    )
}

export default ProfileStats
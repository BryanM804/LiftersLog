
interface XpBarProps {
    value: number,
    max: number
}

function XpBar({ value, max }: XpBarProps) {
    return (
        <>
            <div className="xpGutter">
                <div className="xpBar" style={{ width: `${(value / max) * 100}%`}}></div>
            </div>
        </>
    )
}

export default XpBar;
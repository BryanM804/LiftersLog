
interface XpBarProps {
    value: number,
    max: number
}

function XpBar({ value, max }: XpBarProps) {
    return (
        <>
            XP: {value}/{max}
        </>
    )
}

export default XpBar;
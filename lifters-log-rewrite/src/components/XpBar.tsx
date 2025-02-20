
interface XpBarProps {
    value: number,
    max: number
}

function XpBar({ value, max }: XpBarProps) {
    return (
        <>
            {value}/{max}
        </>
    )
}

export default XpBar;
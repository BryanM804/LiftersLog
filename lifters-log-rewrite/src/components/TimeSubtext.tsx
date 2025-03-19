import { ReactNode } from "react"

type TimeSubtextProps = {
    children: ReactNode;
    className?: string;
}

function TimeSubtext({ children, className }: TimeSubtextProps) {
    return(
        <span className={"darkFont smallText " + className} >[{children}]</span>
    )
}

export default TimeSubtext
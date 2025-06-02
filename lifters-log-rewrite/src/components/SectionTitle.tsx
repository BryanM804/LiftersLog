
type SectionTitleProps = {
    text: string;
}

// I made this later in development, I will replace clutter later everywhere else that could use things like this

function SectionTitle({ text }: SectionTitleProps) {
    return (
        <div style={{width: "100%"}}>
            <h3>{text}</h3>
            <hr />
        </div>
    )
}

export default SectionTitle
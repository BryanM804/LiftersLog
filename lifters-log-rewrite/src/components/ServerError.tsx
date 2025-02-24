
type ServerErrorProps = {
    error: Error;
}

function ServerError({ error }: ServerErrorProps) {
    return (
        <>Server Error Occurred: {error}</>
    )
}

export default ServerError
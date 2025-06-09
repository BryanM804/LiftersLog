import loadingGif from "../assets/loading-gif.gif"

function Loading() {

    // Make a nicer loading element later
    return (
        <>
            <img src={loadingGif} height={48} width={48} style={{alignSelf: "center"}}/>
        </>
    )
}

export default Loading
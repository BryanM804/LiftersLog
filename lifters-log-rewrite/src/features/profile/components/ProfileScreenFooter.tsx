import { VERSION_NUMBER } from "../../../utils/constants"


function ProfileScreenFooter() {
    return (
        <>
            <div className="profileScreenFooter">
                <div style={{flexDirection: "row", display: "flex", gap: "0.5rem"}}>
                    <a className="plainLink" href="https://github.com/BryanM804/LiftersLog/issues" target="_blank">Report a Bug</a>
                    |
                    <a className="plainLink" href="https://github.com/BryanM804/LiftersLog/discussions/categories/ideas" target="_blank">Suggestions</a>
                    |
                    <a className="plainLink" href="https://github.com/BryanM804/LiftersLog/blob/main/CHANGELOG.md" target="_blank">Changelog</a>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div className="darkFont">V: {VERSION_NUMBER}</div>
                </div>
            </div>
        </>
    )
}

export default ProfileScreenFooter
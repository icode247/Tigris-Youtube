import PrimarySearchAppBar from "../../components/Navbar"
export default function Player() {
    const createHandler = () => {
        return null
    }
    return (
        <>
            <PrimarySearchAppBar createHandler={createHandler} />
            <div>
                <video src="https://www.shutterstock.com/shutterstock/videos/1076215751/preview/stock-footage-happy-diverse-business-people-office-workers-team-standing-in-row-looking-at-camera-multiethnic.webm" controls="true"></video>
            </div>
        </>
    )
}
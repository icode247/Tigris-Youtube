import PrimarySearchAppBar from "../../components/Navbar"
import { Container } from "@mui/material"

export default function Player() {
    const createHandler = () => {
        return null
    }
    return (
        <>
            <PrimarySearchAppBar createHandler={createHandler} />
            <Container>
            <div>
                <video src="https://www.shutterstock.com/shutterstock/videos/1076215751/preview/stock-footage-happy-diverse-business-people-office-workers-team-standing-in-row-looking-at-camera-multiethnic.webm" controls={true} style={{width:"100%"}}></video>
            </div>
            </Container>
        </>
    )
}
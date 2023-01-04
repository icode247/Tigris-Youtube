import PrimarySearchAppBar from "../../components/Navbar"
import { Container } from "@mui/material"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

export default function Player() {
    const [activeVideo, setActiveVideo] = useState('')
    const createHandler = () => {
        return null
    }
    type FetchStatus = "loading" | "success" | "error";
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>("success");
    const router = useRouter()
    const { id } = router.query

    const getVideo = (id?: string) => {

        fetch("/api/item/" + id).then((response) => response.json())
            .then((data) => {
                console.log(data)
                setActiveVideo(data)
                setFetchStatus("success");
            });
    };
    useEffect(() => getVideo(id as string))
    return (
        <>
            <PrimarySearchAppBar createHandler={createHandler} />
            <Container>
                <div>
                    <video src="https://www.shutterstock.com/shutterstock/videos/1076215751/preview/stock-footage-happy-diverse-business-people-office-workers-team-standing-in-row-looking-at-camera-multiethnic.webm" controls={true} style={{ width: "100%" }}></video>
                    <h4>The 3 SACRIFICES You Need To Make to Escape Poverty</h4>
                    <h6>Success Secrets TV</h6>
                </div>
            </Container>
        </>
    )
}
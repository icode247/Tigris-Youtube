import PrimarySearchAppBar from "../../components/Navbar"
import { Container } from "@mui/material"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { VideoModel } from "../../db/models/video"

export default function Player() {
    const [activeVideo, setActiveVideo] = useState<VideoModel>()
    const createHandler = () => {
        return null
    }
    type FetchStatus = "loading" | "success" | "error";
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>("success");
    const router = useRouter()
    const { id } = router.query

    const getVideo = (id?: string) => {

        fetch("/api/video/" + id).then((response) => response.json())
            .then((data) => {
                console.log(data)
                setActiveVideo(data.result)
                setFetchStatus("success");
            });
    };
    useEffect(() => getVideo(id as string),[id])
    return (
        <>
            <PrimarySearchAppBar createHandler={createHandler} />
            <Container>
                <div>
                    <video src="https://www.shutterstock.com/shutterstock/videos/1076215751/preview/stock-footage-happy-diverse-business-people-office-workers-team-standing-in-row-looking-at-camera-multiethnic.webm" controls={true} style={{ width: "100%" }}></video>
                    <h4>{activeVideo?.name}</h4>
                    <h6>Success Secrets TV</h6>
                </div>
            </Container>
        </>
    )
}
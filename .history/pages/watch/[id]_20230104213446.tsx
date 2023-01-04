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
                setActiveVideo(data.result)
                setFetchStatus("success");
            });
    };
    hasSession: boolean,
    setSession: React.Dispatch<React.SetStateAction<boolean>>
    handleSignUp: (name: string, email: string, password: string) => void,
    handleSignIn: (email: string, password: string) => void,
    useEffect(() => getVideo(id as string),[id])
    return (
        <>
            <PrimarySearchAppBar createHandler={createHandler} searchQuery={createHandler} hasSession={}/>
            <Container>
                <div>
                    <video src={activeVideo?.video} controls={true} style={{ width: "100%" }}></video>
                    <h4>{activeVideo?.name}</h4>
                    <h6>{activeVideo?.user}</h6>
                </div>
            </Container>
        </>
    )
}
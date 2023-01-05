/* eslint-disable react/jsx-key */
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import { VideoModel } from "../db/models/video";
import tigrisDB from "../lib/tigris";
import PrimarySearchAppBar from "../components/Navbar"
import Video from "../components/Video";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


type Props = {
  videos: Array<VideoModel>;
};

type FetchStatus = "loading" | "success" | "error" | false;
type VideoViewMode = "list" | "search";

const Home: NextPage<Props> = ({ videos }) => {

  const [videoList, setVideoList] = useState<VideoModel[]>(videos);

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(false);

  const [viewMode, setViewMode] = useState<VideoViewMode>("list");
  const [hasSession, setSession] = useState(false);

  const fetchVideos = () => {
    fetch("api/videos")
      .then((response) => response.json())
      .then((data) => {
        setFetchStatus("success");
        if (data.result) {
          setVideoList(data.result);
        } else {
          setFetchStatus("error");
        }
      })
      .catch((e) => {
        console.log(e)
        setFetchStatus("error");
      });
  };

  useEffect(() => {
    fetchVideos()
  }, [videoList])

  // Create Video
  const createHandler = (name: string, url: string, video: string) => {
    fetch("api/videos", {
      method: "POST", body: JSON.stringify({
        name,
        video,
        cover: url,
        user: NamedNodeMap,

      })
    })
      .then(() => {
        setFetchStatus("success");
      })
      .catch((e) => {
        console.log(e)
        setFetchStatus("error");
      });
  };

  const searchQuery = (searchInput: string) => {
    setFetchStatus("loading");

    fetch(`/api/videos/search?q=${encodeURI(searchInput)}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setFetchStatus("success");
        if (data.result) {
          setViewMode("search");
          setVideoList(data.result);
        }
      });
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    fetch("api/users/signup", {
      method: "POST", body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(() => {
        setFetchStatus("success");
      })
      .catch((e) => {
        console.log(e)
        setFetchStatus("error");
      });
  }

  const handleSignIn = (email: string, password: string) => {
    fetch("api/users/signin", {
      method: "POST", body: JSON.stringify({
        email,
        password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setSession(true)
        }
      })
      .catch((e) => {
        console.log(e)
        setFetchStatus("error");
      });
  }

  return (
    <div>
      <Head>
        <title>Streaming App using Next.js + Tigris</title>
        <meta name="description" content="Tigris app tutorial" />
      </Head>

      <div>
        <PrimarySearchAppBar createHandler={createHandler} searchQuery={searchQuery} hasSession={hasSession} setSession={setSession} handleSignUp={handleSignUp} handleSignIn={handleSignIn} fetchStatus={fetchStatus}/>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
            {videoList && videoList.map((data: any) => <Video video={data} />)}
          </Grid>
        </Container>
      </div>
    </div>
  );
}


export default Home;

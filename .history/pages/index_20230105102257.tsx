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

type FetchStatus = "loading" | "success" | "error";
type VideoViewMode = "list" | "search";

const Home: NextPage<Props> = ({ videos }) => {
  // This is the input field
  // const [textInput, setTextInput] = useState("");

  // Todo list array which displays the todo items
  const [videoList, setVideoList] = useState<VideoModel[]>(videos);

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("success");

  // // This is used to animate the input text field
  // const [wiggleError, setWiggleError] = useState(false);

  // // Two separate views. 1. List view for todo items & 2. Search result view
  const [viewMode, setViewMode] = useState<VideoViewMode>("list");
  const [hasSession, setSession] = useState(false);

  // // Fetch Todo List
  /*
   'fetchListItems' is the first method that's called when the component is mounted from the useEffect below.
   This sets some state like 'isLoading' and 'isError' before it fetches for data from the endpoint defined under 'pages/api/items/index'.
   The api endpoint returns a json with the key 'result' and a status 200 if successful or returns a status 500 along with the 'error' key.
   If the 'result' key is present we safely set the 'todoList'.
  */
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
        user: "2",

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
  // const setHasError = (hasError: boolean) => {
  //   setWiggleError(hasError);
  //   if (hasError) {
  //     setTimeout(() => {
  //       setWiggleError(false);
  //     }, 500);
  //   }
  // };

  // Util search query/input check
  /*
  This is a helper util method, that validates the input field via a regex and returns a true or false.
  This also wiggles the text input if the regex doesn't find any match.
  */
  // const queryCheckWiggle = () => {
  //   const result: RegExpMatchArray | null = textInput.match("^\\S.{0,100}$");
  //   if (result === null) {
  //     setHasError(true);
  //     return true;
  //   }
  //   return false;
  // };

  return (
    <div>
      <Head>
        <title>Streaming App using Next.js + Tigris</title>
        <meta name="description" content="Tigris app tutorial" />
      </Head>

      <div>
        <PrimarySearchAppBar createHandler={createHandler} searchQuery={searchQuery} hasSession={hasSession} setSession={setSession} handleSignUp={handleSignUp} handleSignIn={handleSignIn}/>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
            {videoList && videoList.map((data: any) => <Video video={data} />)}
          </Grid>
        </Container>
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const videosCollection = tigrisDB.getCollection<VideoModel>(VideoModel);
//   const cursor = videosCollection.findMany();
//   const videos = await cursor.toArray();
//   return {
//     props: { videos },
//   };
// };

export default Home;

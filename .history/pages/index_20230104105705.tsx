import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import EachTodo from "../components/EachToDo";
import LoaderWave from "../components/LoaderWave";
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
// type TodoViewMode = "list" | "search";

const Home: NextPage<Props> = ({ videos }) => {
  // This is the input field
  // const [textInput, setTextInput] = useState("");

  // Todo list array which displays the todo items
  const [videoList, setVideoList] = useState<VideoModel[]>(videos);

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("success");

  // // This is used to animate the input text field
  // const [wiggleError, setWiggleError] = useState(false);

  // // Two separate views. 1. List view for todo items & 2. Search result view
  // const [viewMode, setViewMode] = useState<TodoViewMode>("list");

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
        console.log(data)
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
  }, [])

  // Create Video
  const createHandler = (name: string, url: string) => {
    fetch("api/videos", {
      method: "POST", body: JSON.stringify({
        name,
        video: url,
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



  // Delete Todo-item
  /*
  'deleteTodoItem' requires an id value of the TodoItem. When the user presses the 'delete'(cross) button from a TodoItem, this method is invoked.
  It calls the endpoint 'api/item/<id>' with the 'DELETE' method. Read the method 'handleDelete' under pages/api/item/[id]' to learn more how the api handles deletion.
  */
  // const deleteVideo = (id?: number) => {
  //   setFetchStatus("loading");

  //   fetch("/api/item/" + id, {
  //     method: "DELETE",
  //   }).then(() => {
  //     setFetchStatus("success");
  // if (viewMode == "list") {
  //   fetchListItems();
  // } else {
  //   searchQuery();
  // }
  //   });
  // };

  // Update Todo-item (mark complete/incomplete)
  /*
  'updateTodoItem' takes the TodoItem object, inverts the 'completed' boolean and calls the same endpoint as 'deletion' but with a different method 'PUT'.
  Navigate to 'api/item/[id]' and read more how the api handles updates under the 'handlePut' method.
  */
  // const updateTodoItem = (item: TodoItem) => {
  //   item.completed = !item.completed;
  //   setFetchStatus("loading");

  //   fetch("/api/item/" + item.id, {
  //     method: "PUT",
  //     body: JSON.stringify(item),
  //   }).then(() => {
  //     setFetchStatus("success");
  //     if (viewMode == "list") {
  //       fetchListItems();
  //     } else {
  //       searchQuery();
  //     }
  //   });
  // };

  // Search query
  /*
  'searchQuery' method takes the state from 'textInput' and send it over to the 'api/items/search' endpoint via a query param 'q'.
  The response is the same as the response from "fetch('/api/items')", an array of TodoItems if successful.
  */
  // const searchQuery = () => {
  //   if (queryCheckWiggle()) {
  //     return;
  //   }
  //   setFetchStatus("loading");

  //   fetch(`/api/items/search?q=${encodeURI(textInput)}`, {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFetchStatus("success");
  //       if (data.result) {
  //         setViewMode("search");
  //         setTodoList(data.result);
  //       }
  //     });
  // };

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
        <PrimarySearchAppBar createHandler={createHandler} />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
            {videoList && videoList.map(video=> <Video video={video}/> })
           
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

import { NextApiRequest, NextApiResponse } from "next";
import { VideoModel} from "../../../db/models/video";
import tigrisDB from "../../../lib/tigris";

type Data = {
  result?: VideoModel;
  error?: string;
};

// GET /api/video/[id] -- gets video from collection where id = [id]
// PUT /api/video/[id] {VideoModel} -- updates the video in collection where id = [id]
// DELETE /api/video/[id] -- deletes the video in collection where id = [id]
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      await handleGet(req, res, Number(id));
      break;
    case "PUT":
      await handlePut(req, res);
      break;
    case "DELETE":
      await handleDelete(req, res, Number(id));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  videoId: number
) {
  try {
    const videosCollection = tigrisDB.getCollection<VideoModel>(VideoModel);
    const video = await videosCollection.findOne({ id: videoId });
    if (!video) {
      res.status(404).json({ error: "No video found" });
    } else {
      res.status(200).json({ result: video });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const video = JSON.parse(req.body) as VideoModel;
    const videosCollection = tigrisDB.getCollection<VideoModel>(VideoModel);
    const updated = await videosCollection.insertOrReplaceOne(video);
    res.status(200).json({ result: updated });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}

async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  videoId: number
) {
  try {
    const videosCollection = tigrisDB.getCollection<VideoModel>(VideoModel);
    const status = (await videosCollection.deleteOne({ id: videoId })).status;
    if (status === "deleted") {
      res.status(200).json({});
    } else {
      res.status(500).json({ error: `Failed to delete ${videoId}` });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}

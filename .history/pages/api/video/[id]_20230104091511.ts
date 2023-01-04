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
  vidoeId: number
) {
  try {
    const videosCollection = tigrisDB.getCollection<VideoModel>(VideoModel);
    const vidoe = await videosCollection.findOne({ id: vidoeId });
    if (!vidoe) {
      res.status(404).json({ error: "No vidoe found" });
    } else {
      res.status(200).json({ result: vidoe });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const vidoe = JSON.parse(req.body) as VideoModel;
    const videosCollection = tigrisDB.getCollection<VideoModel>(VideoModel);
    const updated = await videosCollection.insertOrReplaceOne(vidoe);
    res.status(200).json({ result: updated });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}

async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  vidoeId: number
) {
  try {
    const videosCollection = tigrisDB.getCollection<VideoModel>(VideoModel);
    const status = (await videosCollection.deleteOne({ id: vidoeId })).status;
    if (status === "deleted") {
      res.status(200).json({});
    } else {
      res.status(500).json({ error: `Failed to delete ${vidoeId}` });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}

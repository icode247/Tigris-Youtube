import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../db/models/user";
import tigrisDB from "../../../lib/tigris";

type Response = {
  result?: Array<VideoModel>;
  error?: string;
};

// GET /api/videos -- gets videos from collection
// POST /api/videos {VideoModel} -- inserts a new item to collection
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    case "POST":
      await handlePost(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<Response>) {
  try {
    const videosCollection = tigrisDB.getCollection<VideoModel>(VideoModel);
    const cursor = videosCollection.findMany();
    const videos = await cursor.toArray();
    res.status(200).json({ result: videos });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<Response>) {
  try {
    const video = JSON.parse(req.body) as VideoModel;
    console.log(req.body)
    const videosCollection = tigrisDB.getCollection<VideoModel>(VideoModel);
    const inserted = await videosCollection.insertOne(video);
    res.status(200).json({ result: [inserted] });
  } catch (err) {
    console.log(err)
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}
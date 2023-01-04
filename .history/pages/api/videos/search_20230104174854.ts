import { NextApiRequest, NextApiResponse } from "next";
import { VideoModel } from "../../../db/models/video";
import { SearchRequest } from "@tigrisdata/core/dist/search/types";
import tigrisDB from "../../../lib/tigris";

type Data = {
  result?: Array<VideoModel>;
  error?: string;
};

// GET /api/videos/search?q=searchQ -- searches for videos matching text `searchQ`
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query["q"];
  if (query === undefined) {
    res.status(400).json({ error: "No search query found in request" });
    return;
  }
  try {
    const videosCollection = tigrisDB.getCollection<VideoModel>(VideoModel);
    const searchRequest: SearchRequest<VideoModel> = { q: query as string };
    const searchResult = await videosCollection.search(searchRequest);
    const videos = new Array<VideoModel>();
    for (const hit of searchResult.hits) {
      videos.push(hit.document);
    }
    res.status(200).json({ result: videos });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}

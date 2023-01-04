import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../db/models/user";
import tigrisDB from "../../../lib/tigris";
import bcrypt from 'bcrypt'

type Response = {
  result?: Array<User>;
  error?: string;
};

// GET /api/users -- gets users from collection
// POST /api/users {User} -- inserts a new item to collection
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case "GET":
      await handleLogin(req, res);
      break;
    case "POST":
      await handleSignup(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const hashPassword = async (password: string) =>{
   return await bcrypt.hashSync(password,10);
}
async function handleLogin(req: NextApiRequest, res: NextApiResponse<Response>) {
  try {
    const usersCollection = tigrisDB.getCollection<User>(User);
    const cursor = usersCollection.findMany();
    const users = await cursor.toArray();
    res.status(200).json({ result: users });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}

async function handleSignup(req: NextApiRequest, res: NextApiResponse<Response>) {
  try {
    const user = JSON.parse(req.body) as User;
    user.password = await hashPassword(user.password)
    console.log(req.body)
    const usersCollection = tigrisDB.getCollection<User>(User);
    const inserted = await usersCollection.insertOne(user);
    res.status(200).json({ result: [inserted] });
  } catch (err) {
    console.log(err)
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}
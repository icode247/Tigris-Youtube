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
    case "POST":
      await handleSignIn(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const comparePassword = async (password: string, encrypted: string) =>{
   return await bcrypt.compare(password, encrypted)
}

async function handleSignIn(req: NextApiRequest, res: NextApiResponse<Response>) {
  try {
    const user = JSON.parse(req.body) as User;
    const usersCollection = tigrisDB.getCollection<User>(User);
    const existingUser = await usersCollection.findOne({email: user.email})

    if(!existingUser){
      return res.status(500).json({ error: 'Incorrect crendentials' });
    }
   if(existingUser.password !== await comparePassword)
    res.status(200).json({ result: [inserted] });
  } catch (err) {
    console.log(err)
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}
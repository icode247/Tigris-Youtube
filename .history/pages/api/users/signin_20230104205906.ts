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
      await handleSign(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const hashPassword = async (password: string) =>{
   return await bcrypt.hashSync(password,10);
}

async function handleSignup(req: NextApiRequest, res: NextApiResponse<Response>) {
  try {
    const user = JSON.parse(req.body) as User;
    user.password = await hashPassword(user.password)
    const usersCollection = tigrisDB.getCollection<User>(User);
    const existingUser = usersCollection.findOne({email: user.email})
    if(await existingUser){
      return res.status(500).json({ error: 'An account exists with this email' });
    }
    const inserted = await usersCollection.insertOne(user);
    res.status(200).json({ result: [inserted] });
  } catch (err) {
    console.log(err)
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}
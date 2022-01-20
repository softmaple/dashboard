import type { NextApiRequest, NextApiResponse } from "next";
import { advancedResults } from "../index";
import CloneModel from "@/models/clone";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const clones = await advancedResults(CloneModel, req);

    return res.status(200).json({ clones });
  } catch (err) {
    throw new Error(err.message);
  }
}

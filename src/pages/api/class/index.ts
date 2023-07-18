import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'
import {hashSync} from 'bcrypt-ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {name} = req.body
  try {
    const classes= await prisma.kelas.findMany()
    return res.status(200).json( classes)
  } catch (error) {
    console.error(error)
    return res.status(500).json({  error })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'
import {hashSync} from 'bcrypt-ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {name} = req.body
  try {
    const classCreated = await prisma.kelas.create({
      data: {
        nama: name,

      }
    })
    return res.status(200).json({ register: true,classCreated })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ register: false, error })
  }
}

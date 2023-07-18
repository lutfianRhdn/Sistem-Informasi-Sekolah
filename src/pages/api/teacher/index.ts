import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const teachers= await prisma.guru.findMany()
    return res.status(200).json( teachers)
  } catch (error) {
    console.error(error)
    return res.status(500).json({  error })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {id} = req.query 
    const teacher= await prisma.soal.findUnique({where:{id:+id ||1},include:{guru:true}})
    return res.status(200).json( teacher)
  } catch (error) {
    console.error(error)
    return res.status(500).json({  error })
  }
}

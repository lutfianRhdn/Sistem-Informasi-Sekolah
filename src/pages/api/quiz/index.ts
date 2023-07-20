import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { guru_id,murid_id } = req.query
    const condition = guru_id ? { guru_id: +guru_id } : {}
    const includeAnswer =murid_id? {jawaban: {
          where: {
            murid_id: +murid_id
          },
        }}:{}
    const now = new Date()
    const quizes = await prisma.soal.findMany({
      where: {
        ...condition, tenggat: {
        }
      }, include: {
       ...includeAnswer
      }
      })
      
    return res.status(200).json( quizes )
  } catch (error) {
    console.error(error)
    return res.status(500).json({  error })
  }
}

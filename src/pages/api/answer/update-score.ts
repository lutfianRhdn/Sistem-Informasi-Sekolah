import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {id,value} = req.body
  try {
    const answered = await prisma.jawaban.update({
      where: {
        id: +id
      },
      data: {
        nilai: +value
      },
      include: {
        murid: true,
      }
    })
    return res.status(200).json({ ...answered})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ register: false, error })
  }
}

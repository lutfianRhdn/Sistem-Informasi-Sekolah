import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, description, quiz, type, guru_id, expired_at } = req.body
    console.log(req.body)
    const quizCreated = await prisma.soal.create({
      data: {
        title,
        description,
        path_file: quiz,
        type,
        guru_id: +guru_id,
        tenggat: new Date(expired_at)
      }
    })

    return res.status(200).json({ quizCreated })
  } catch (error) {
    console.error(error)
    return res.status(500).json({  error })
  }
}

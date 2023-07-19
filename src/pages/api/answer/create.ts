import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'
import {hashSync} from 'bcrypt-ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {answer,quiz_id,student_id} = req.body
  try {
    const answered = await prisma.jawaban.create({
      data: {
        nilai: 0,
        pah_file: answer,
        murid_id: student_id,
        soal_id: quiz_id
      }
    })
    return res.status(200).json({ ...answered})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ register: false, error })
  }
}

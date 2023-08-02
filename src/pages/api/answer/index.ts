/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { quiz_id } = req.query
  try {
    if (!quiz_id) throw Error('required id')
    const answered = await prisma.soal.findUnique({
      where: { id: +quiz_id },
      include: {
        jawaban: {
          include: {
            murid: {
              include: { kelas: true },
            },
          },
        },
      },
    })
    return res.status(200).json({ ...answered })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ register: false, error })
  }
}

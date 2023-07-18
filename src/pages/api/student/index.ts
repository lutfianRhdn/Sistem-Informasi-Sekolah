import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'
import {hashSync} from 'bcrypt-ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const students = await prisma.murid.findMany({
      select: {
        kelas: {
          select: {
            nama: true
          },
        },
        nama: true,
        nis: true,
        alamat: true,
      }
    })
    return res.status(200).json( {data:[...students]})
  } catch (error) {
    console.error(error)
    return res.status(500).json({  error })
  }
}

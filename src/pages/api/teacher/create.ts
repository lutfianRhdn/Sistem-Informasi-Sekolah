import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'
import {hashSync} from 'bcrypt-ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {name,nip,address,subject} = req.body
  try {
    const user = await prisma.guru.create({
      data: {
        nama: name,
        nip: nip,
        alamat: address,
        mata_pelajaran: subject,
        password: hashSync('password', 10)
      }
    })
    return res.status(200).json({ register: true,user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ register: false, error })
  }
}

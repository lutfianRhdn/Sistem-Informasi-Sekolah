import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'
import {hashSync} from 'bcrypt-ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, nis, address, class_id } = req.body
  
  try {
    const user = await prisma.murid.create({
      data: {
        nama: name,
        nis: nis,
        alamat: address,
        kelas_id: +class_id,
        password: hashSync('password', 10)
      }
    })
    return res.status(200).json({ register: true,user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ register: false, error })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { serializeCookie } from '@lib'
import prisma from '@lib/database'
import { compareSync } from 'bcrypt-ts';


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { class:className, password } = req.body
  try {
    const classData = await prisma.kelas.findUnique({
      where: {
        nama: className
      },
    })
    if (!classData) {
      return res.status(404).json({ login: false, error: 'Kelas tidak ditemukan' })
    }
    const passwordMatch = compareSync(password, classData.password)
    if (!passwordMatch) {
      return res.status(401).json({ login: false, error: 'Password salah' })
    }
    const cookie = serializeCookie('user', {...classData,role:"walikelas"})

    return res.status(200).setHeader('Set-Cookie', cookie).json({ login: true, class:classData })
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({ login: false, error })
  }
}

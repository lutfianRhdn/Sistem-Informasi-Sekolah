import type { NextApiRequest, NextApiResponse } from 'next'
import { serializeCookie } from '@lib'
import prisma from '@lib/database'
import {compareSync} from 'bcrypt-ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body
  try {
    let role=""
    if (username === '000' && password === "password") {
    role="admin"

      const cookie = serializeCookie('user', { username: 'admin',role  })
      return res.status(200)
        .setHeader('Set-Cookie', cookie)
        .json({ login: true,role:'admin' })
      
    }
    let user:any = {}
    if (username.length === 8) {
      user = await prisma.murid.findUnique({
        where: {
          nis: username
        }
      })
      role="murid"

    } else if (username.length === 18) {
      user =await prisma.guru.findUnique({
        where: {
          nip: username
        }
      })
      role="guru"
    } else {
     return res.status(404).json({ login: false, error: 'User tidak ditemukan' })
    }
    const passwordIsValid = compareSync(password, user.password)
    if (!passwordIsValid) {
      return res.status(404).json({ login: false, error: 'User tidak ditemukan' })
    }
    const cookie = serializeCookie('user', {...user,role})
    return res.status(200)
      .setHeader('Set-Cookie', cookie)
      .json({ login: true,role })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ login: false, error })
  }
}

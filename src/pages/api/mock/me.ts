import type { NextApiRequest, NextApiResponse } from 'next'
import {  } from '@lib'
import cookie from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = cookie.parse(req.headers.cookie || '').user
  if(!user) return res.status(401).json({message:"Unauthorized"})
    return res.status(200)
      .json(JSON.parse(user.slice(2)) )
  
}

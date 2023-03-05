import { slugify } from '@/lib/common'
import { getSession } from '@/lib/session'
import {
  createDBConnection,
  deleteDBConnection,
  getDBConnection,
  getDBConnections,
} from 'models/connection'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGET(req, res)
    case 'POST':
      return handlePOST(req, res)
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      })
  }
}

// Get dbConnections
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res)
  if (!session) {
    return res.status(401).json({ error: { message: 'Unauthorized' } })
  }
  const data = await getDBConnections()

  return res.status(200).json({ data, error: null })
}

// Create a dbConnection
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, username, password, host, port, database } = req.body
  console.log('handlePOST')
  const session = await getSession(req, res)
  if (!session) {
    return res.status(401).json({ error: { message: 'Unauthorized' } })
  }

  if (await getDBConnection({ id })) {
    return res.status(200).json({
      data: null,
      error: {
        message:
          'A connection with this id already exists. Connection id must be unique',
      },
    })
  }

  const data = await createDBConnection({
    id,
    username,
    password,
    host,
    port: +port,
    database,
  })

  return res.status(200).json({ data, error: null })
}

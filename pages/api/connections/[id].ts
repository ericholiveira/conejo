import { slugify } from '@/lib/common'
import { getSession } from '@/lib/session'
import { deleteDBConnection, getDBConnection } from 'models/connection'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGET(req, res)
    case 'DELETE':
      return handleDELETE(req, res)
    default:
      res.setHeader('Allow', ['GET', 'DELETE'])
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
  const { id } = req.query as { id: string }
  const data = await getDBConnection({ id })

  return res.status(200).json({ data, error: null })
}

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string }

  const session = await getSession(req, res)
  if (!session) {
    return res.status(401).json({ error: { message: 'Unauthorized' } })
  }

  if (!(await getDBConnection({ id }))) {
    return res.status(200).json({
      data: null,
      error: {
        message: `There's no connection with this id ${id}`,
      },
    })
  }

  const data = await deleteDBConnection({ id })

  return res.status(200).json({ data, error: null })
}

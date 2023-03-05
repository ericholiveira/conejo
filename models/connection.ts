import { prisma } from '@/lib/prisma'

export const createDBConnection = async (param: {
  id: string
  username: string
  password: string
  host: string
  port: number
  database: string
}) => {
  const { id, username, password, host, port, database } = param
  return prisma.dBConnection.create({
    data: { id, username, password, host, port, database },
  })
}

export const getDBConnection = ({ id }: { id: string }) => {
  return prisma.dBConnection.findUnique({
    where: { id },
  })
}

export const deleteDBConnection = ({ id }: { id: string }) => {
  return prisma.dBConnection.delete({
    where: { id },
  })
}

export const getDBConnections = () => {
  return prisma.dBConnection.findMany({
    where: {},
  })
}

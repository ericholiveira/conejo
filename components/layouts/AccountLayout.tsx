import { Error, Loading, Sidebar } from '@/components/ui'
import useTeams from 'hooks/useTeams'
import React from 'react'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isError, teams } = useTeams()

  if (isLoading || !teams) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <div className="flex overflow-hidden  w-full">
        <Sidebar />
        <div className="relative h-full w-full overflow-y-auto">
          <main>
            <div className="flex h-screen w-full justify-center bg-base-200">
              <div className="w-full">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

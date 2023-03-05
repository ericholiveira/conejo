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
      <div className="flex overflow-hidden w-full bg-base-200">
        <Sidebar />
        <div className="relative h-full w-full overflow-y-auto mx-5 my-5">
          <main>
            <div className="flex h-screen w-full justify-center">
              <div className="w-full">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

import { Suspense } from 'react'
import type { Metadata } from 'next'
import Loading from './loading'
import LeftSideCard from '@/components/app/SideCard/Left'
import Main from '@/components/app/Container/Main'
import { name } from '~/config.json'

export const metadata: Metadata = {
  title: `${name} の 小屋`,
  description: 'Welcome to my blog!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LeftSideCard />
      <Suspense fallback={<Loading />}>
        <Main>{children}</Main>
      </Suspense>
    </>
  )
}

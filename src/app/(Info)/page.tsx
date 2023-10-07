import * as React from 'react'
import Title from '@/components/ui/Title'
import type { Metadata } from 'next'
import { useRequest } from '@/lib/api'
import ArticleBanner from '@/components/ui/Banner'

export default async function Home() {
  const data = await useRequest<FullFrontMatter[]>('article?pagenum=0')
  return (
    <div>
      <Title>首页</Title>
      <ArticleBanner col={1} posts={data} name="文章页" />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Plumbiu | 首页',
  description: '这里是 Plumbiu 的个人介绍首页',
}

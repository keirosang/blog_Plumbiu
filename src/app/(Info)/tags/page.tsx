import type { Metadata } from 'next'
import TagsCmp from '@/components/Tags'
import { useRequest } from '@/lib/api'
import React from 'react'

// FIXME: client component is not support async/await
const Tags = async () => {
  const tags = await useRequest<Tag[]>('tags')
  return <TagsCmp tags={tags} />
}

export default Tags

export const metadata: Metadata = {
  title: 'Plumbiu | 标签',
  description: '这里是 Plumbiu 的文章标签',
}

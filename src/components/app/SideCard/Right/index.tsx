import React from 'react'
import Chips from '../Chips'
import { useGet } from '@/lib/api'
import '../index.css'
import './index.css'
import Title from '@/components/ui/Title'
import DateTitle from '../../DateTitle'
import Link from 'next/link'

const RightCard = async () => {
  const tags = await useGet<Tag[]>('tag')
  const categories = await useGet<Category[]>('category')
  const archiveArts = await useGet<IFullFrontMatter[]>('archive?limit=5')
  const archeveYear = await useGet<IArcheveYear[]>('archive/years')

  return (
    <div className="Side-Right">
      <div className="Side-Item">
        <Title>标签</Title>
        <Chips path="tags" chips={tags} />
      </div>
      <div className="Side-Item">
        <Title>分类</Title>
        <Chips path="categories" chips={categories} />
      </div>
      <div className="Side-Item">
        <Title>最近文章</Title>
        <DateTitle articles={archiveArts} />
      </div>
      <div className="Side-Item">
        <Title>归档</Title>
        {archeveYear.map(({ year, num }) => (
          <Link key={year} href={'/archive/' + year} className="Hover-Dark Side-Archive-Link">
            <div>{year}</div>
            <div>{num}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RightCard

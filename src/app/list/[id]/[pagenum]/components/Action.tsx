import { Link } from 'next-view-transitions'
import { ReactNode } from 'react'
import { PostDir } from '@/constants'
import { upperFirstChar } from '@/utils'
import { cn } from '@/utils/client'
import { BlogIcon, LifeIcon, SummaryIcon, NoteIcon } from '@/components/Icons'
import styles from './Action.module.css'

const iconMap: Record<(typeof PostDir)[number], ReactNode> = {
  blog: <BlogIcon style={{ backgroundColor: 'var(--c-green-soft)' }} />,
  life: <LifeIcon style={{ backgroundColor: 'var(--c-red-soft)' }} />,
  summary: <SummaryIcon style={{ backgroundColor: 'var(--c-indigo-soft)' }} />,
  note: <NoteIcon style={{ backgroundColor: 'var(--c-gray-soft)' }} />,
}

function ArtlistAction({ id }: { id: string }) {
  return (
    <div className={styles.action}>
      {PostDir.map((p) => (
        <Link
          className={cn(styles.item, {
            [styles.active]: id === p,
          })}
          scroll={false}
          key={p}
          href={`/list/${p}/1`}
        >
          {upperFirstChar(p)}
          {iconMap[p]}
        </Link>
      ))}
    </div>
  )
}

export default ArtlistAction
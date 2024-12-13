import Link from 'next/link'
import { Metadata } from 'next'
import { BiliBiliIcon, GithubIcon } from '@/components/Icons'
import Tag from '@/components/Tag'
import { cn } from '@/utils/client'
import { BilibiliId, BlogAuthor, GithubName } from '~/data/site'
import styles from './page.module.css'
import { generateSeoMetaData, joinWebUrl } from '../seo'

function About() {
  return (
    <div className={cn(styles.wrap, 'center')}>
      <h1 className={styles.hi}> Hi, I'm {BlogAuthor} 👋</h1>
      <div className={styles.tag}>
        <Tag icon="#">Engineer</Tag>
        <Tag icon="#">Business Owner</Tag>
      </div>
      <div className={styles.desc}>
      I am a farmer from an eastern country with 18 years of coding experience.<br />
      I am very proficient in using programming tools and maintaining operating systems.<br />
      I use CTRL+C/CTRL+V for coding work all year round,<br />
      The C/V keys on my keyboard are severely worn out,<br />
      I have been doing low-level coding for a long time, which resulted in very low-quality coding.<br />
      </div>
      <ul>
        <li>I started learning programming in 2004.</li>
        <li>I started coding in 2006 and have been doing it ever since.</li>
        <li>The number of my BUG records has exceeded 1 million, and the resolution rate is 89.0%.</li>
      </ul>
      <div></div>
      <div className={styles.tag}>
        <Tag icon="#">Full Stack Developer</Tag>
        <Tag icon="#">System architect</Tag>
      </div>
      <div>
        {/* If you are interested in this blog:{' '}
        <Link
          className="link"
          target="_blank"
          href="/posts/blog/How-I-Build-My-Blog"
        >
          How this blog works
        </Link> */}
      </div>
      <div className={styles.links}>
        <Link target="_blank" href={`https://github.com/${GithubName}`}>
          <GithubIcon />
        </Link>
        <Link target="_blank" href={`https://space.bilibili.com/${BilibiliId}`}>
          <BiliBiliIcon />
        </Link>
      </div>
      <div>Happy reading! 🍺</div>
    </div>
  )
}

const Title = `${BlogAuthor} | About`
const Desc = `${BlogAuthor}'s introduction`
export const metadata: Metadata = {
  title: Title,
  description: Desc,
  ...generateSeoMetaData({
    title: Title,
    description: Desc,
    url: joinWebUrl('about'),
  }),
}

export default About

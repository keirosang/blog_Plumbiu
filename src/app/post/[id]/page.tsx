import type { Metadata } from 'next'
import '@plumbiu/md/style/github-markdown.css'
import '@plumbiu/md/style/hljs-markdown.css'
import { md2html } from '@plumbiu/md'
import { minify } from 'html-minifier-terser'
import { useGet } from '@/lib/api'
import TocCmp from '@/components/app/Toc'
import { name } from '@/lib/json'
import PostCmp from '@/components/app/Post'

interface Props {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const posts = await useGet<IFrontMatter[]>('article')
  const ids = posts.map((post) => ({
    id: post.id,
  }))

  return ids
}

export default async function PostId({ params }: Props) {
  const { content, title, tags, categories, date, updated } =
    await useGet<IArticle>('article/' + params.id)
  const html = await minify(await md2html(content), {
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    removeTagWhitespace: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeComments: true,
    removeOptionalTags: true,
    removeEmptyElements: true,
    trimCustomFragments: true,
    useShortDoctype: true,
  })

  return (
    <>
      <PostCmp html={html} />
      <TocCmp
        html={html}
        title={title}
        tags={tags}
        categories={categories}
        date={date}
        updated={updated}
      />
    </>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, desc, tags, categories } = await useGet<IArticle>(
    'article/' + params.id,
  )

  return {
    title: `${name} | 文章 - ${title}`,
    description: desc,
    keywords: tags,
    category: categories.join(','),
  }
}

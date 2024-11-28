import fs from 'node:fs'
import fsp from 'node:fs/promises'
import yaml from 'js-yaml'
import { minify_sync } from 'terser'
import sharp from 'sharp'
import { FrontmatterWrapStr, PostDir } from '@/constants'
import stripMarkdown from '../strip-markdown'
import {
  isLikeNum,
  getCategory,
  removeMdSuffix,
  joinFormatPaths,
} from '../index'

export interface FrontMatterItem {
  title: string
  date: number
  desc: string
  subtitle: string
  hidden?: boolean
  tags?: string[]
  readTime: string
}

export async function getMarkdownPath() {
  const results: string[] = []
  await Promise.all(
    PostDir.map(async (dir) => {
      const postsPath = joinFormatPaths('posts', dir)
      const posts = await fsp.readdir(postsPath)
      results.push(...posts.map((p) => joinFormatPaths(postsPath, p)))
    }),
  )
  return results
}

export function getFrontmatter(code: string) {
  const startIdx = code.indexOf(FrontmatterWrapStr)
  if (startIdx !== 0) {
    return {}
  }
  const endIndex = code.indexOf(FrontmatterWrapStr, 1)
  const parseString = code.slice(FrontmatterWrapStr.length, endIndex)
  const frontmatter = yaml.load(parseString) as FrontMatterItem
  const desc = frontmatter.desc
  const content = code.slice(endIndex + 3)
  const rawText = stripMarkdown(content).trim()
  if (desc && isLikeNum(desc)) {
    const segments = rawText.split(/\r?\n/g).filter((s) => s.trim())
    frontmatter.desc = segments.length > 0 ? segments[+desc - 1] : ''
  }
  if (frontmatter.date) {
    frontmatter.date = new Date(frontmatter.date).valueOf()
  }
  frontmatter.readTime = (rawText.length / 225).toFixed(0)
  return {
    frontmatter,
    content,
  }
}

export interface PostList extends FrontMatterItem {
  path: string
}

export async function getPostList(id?: string) {
  const result: PostList[] = []
  const mds = await getMarkdownPath()
  await Promise.all(
    mds.map(async (mdPath) => {
      const type = getCategory(mdPath)
      if (id != null && type !== id) {
        return
      }
      const file = await fsp.readFile(mdPath, 'utf-8')
      const { frontmatter, content } = getFrontmatter(file)
      if (!frontmatter || !content || frontmatter.hidden) {
        return
      }
      const data = {
        ...frontmatter,
        path: removeMdSuffix(mdPath),
      }
      result.push(data)
    }),
  )

  return result.sort((prev, next) => next.date - prev.date)
}

export function tryReadFileSync(p: string) {
  let content = ''
  try {
    content = fs.readFileSync(p, 'utf-8')
  } catch (error) {}

  return content
}

export function minify(code: string) {
  code = code.replace('"use strict";', '')
  const mini = minify_sync(code, {
    compress: {
      ecma: 2018,
      ie8: false,
    },
    mangle: { toplevel: true },
  }).code
  if (!mini) {
    return code
  }
  return mini
}

export async function getBlurDataUrl(filePath: string) {
  const image = sharp(filePath)
  const metadata = await image.metadata()
  const originWidth = metadata.width
  const originHeight = metadata.height
  if (!originHeight || !originWidth) {
    return {}
  }
  const resizedSize = 14
  const resizedImage = image.resize({
    width: Math.min(originWidth, resizedSize),
    height: Math.min(originHeight, resizedSize),
    fit: 'inside',
  })
  const output = resizedImage.webp({
    quality: 20,
    alphaQuality: 20,
    smartSubsample: true,
  })

  const { data } = await output.toBuffer({ resolveWithObject: true })

  return {
    base64: `data:image/webp;base64,${data.toString('base64')}`,
    metadata,
  }
}

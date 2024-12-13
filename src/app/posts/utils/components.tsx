import path from 'node:path'
import { type Components } from 'hast-util-to-jsx-runtime'
import { ImageProps } from 'next/image'
import { toString } from 'hast-util-to-string'
import MarkdownImage from '@/app/posts/components/Image'
import { handleComponentName } from '@/plugins/constant'
import { isUnOptimized, resolveAssetPath, isExternalImage } from '@/utils'
import CustomComponent from '~/data/components'
import { getBlurDataUrl } from '@/utils/node/optimize'
import PreComponent from '../components/Pre'
import { downloadImage } from '@/utils/node/images'

export const markdownComponents: Partial<Components> = {
  pre(props) {
    const { node, ...rest } = props
    const component = handleComponentName(props)
    const children = props.children
    // reduce bundle size, {...props} is too large, if it's not CustromComponent
    // the pre element will contain too many information
    if (component) {
      return <CustomComponent {...rest} />
    }
    const code = props.node ? toString(props.node) : undefined
    return <PreComponent code={code}>{children}</PreComponent>
  },
  // @ts-ignore
  async img(props) {
    const { src, alt } = props
    if (!src || !alt) {
      return null
    }

    let finalSrc = src
    if (isExternalImage(src)) {
      try {
        // 下载外部图片并获取本地文件名
        const localFileName = await downloadImage(src)
        finalSrc = localFileName
      } catch (error) {
        console.error('Failed to download image:', src, error)
        // 如果下载失败，继续使用原始URL
      }
    }

    const commonProps: ImageProps = {
      src: isExternalImage(finalSrc) ? finalSrc : resolveAssetPath(`images/${finalSrc}`),
      alt,
      unoptimized: isUnOptimized(finalSrc),
    }

    // 获取图片信息
    const imagePath = path.join('public', 'images', finalSrc)
    try {
      const { base64, metadata } = await getBlurDataUrl(imagePath)
      if (base64 && metadata) {
        Object.assign(commonProps, {
          blurDataURL: base64,
          placeholder: 'blur',
          width: metadata.width,
          height: metadata.height,
        })
      }
    } catch (error) {
      console.error('Failed to get image metadata:', finalSrc, error)
      // 如果获取元数据失败，使用默认尺寸
      Object.assign(commonProps, {
        width: 800,
        height: 600,
        style: { width: '100%', height: 'auto' }
      })
    }

    return <MarkdownImage {...commonProps} />
  },
  // @ts-ignore
  async div(props) {
    const { node, ...rest } = props
    return <CustomComponent {...rest} />
  },
}

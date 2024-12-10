/* eslint-disable @stylistic/max-len */
'use client'

import {
  ColumnsPhotoAlbum,
  RenderImageContext,
  RenderImageProps,
} from 'react-photo-album'
import Image from 'next/image'
import 'react-photo-album/columns.css'
import { useState } from 'react'
import { Lightbox } from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import IntersectionObserverComponent from '@/components/IntersectionObserverComponent'
import { isUnOptimized } from '@/utils'
import { getGalleryPhoto, Photo } from '@/plugins/remark/gallery-utils'
import styles from './index.module.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

function renderNextImage(
  { alt = '', title, sizes }: RenderImageProps,
  context: RenderImageContext,
) {
  const { photo, width, height } = context
  const { src, base64 } = photo as Photo
  console.log(context)
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        unoptimized={isUnOptimized(src)}
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={base64}
      />
    </div>
  )
}
function ImageGallery(props: any) {
  const pothos = getGalleryPhoto(props)
  const [index, setIndex] = useState(-1)
  return (
    <IntersectionObserverComponent className={styles.gallery}>
      {() => (
        <>
          <ColumnsPhotoAlbum
            spacing={4}
            photos={pothos}
            render={{ image: renderNextImage }}
            onClick={({ index }) => setIndex(index)}
          />
          <Lightbox
            slides={pothos}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            // enable optional lightbox plugins
            plugins={[Thumbnails]}
          />
        </>
      )}
    </IntersectionObserverComponent>
  )
}

export default ImageGallery

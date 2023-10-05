import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Plumbiu の 小屋',
    short_name: "Plumbiu's blog",
    description: 'Plumbiu 的 material 风格博客',
    start_url: '.',
    display: 'standalone',
    background_color: '#F6F8FC',
    theme_color: '#1976d2',
    prefer_related_applications: true,
    related_applications: [
      {
        platform: 'play',
        url: 'https://blog.plumbiu.top',
        id: 'com.app.blog.plumbiu',
      },
    ],
    icons: [
      {
        src: 'icons/favico-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'icons/favico-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'icons/favico-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'icons/favico-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'icons/favico-256x256.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'icons/favico-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
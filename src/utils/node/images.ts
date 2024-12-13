import crypto from 'crypto'
import fs from 'fs'
import { mkdir, access, unlink } from 'fs/promises'
import path from 'path'
import https from 'https'

export async function downloadImage(url: string): Promise<string> {
  await mkdir(path.join(process.cwd(), 'public', 'images'), { recursive: true })

  const md5 = crypto.createHash('md5').update(url).digest('hex')
  const ext = path.extname(url)
  const fileName = `${md5}${ext}`
  const localPath = path.join(process.cwd(), 'public', 'images', fileName)

  try {
    await access(localPath)
    return fileName
  } catch {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`))
          return
        }

        const fileStream = fs.createWriteStream(localPath)
        response.pipe(fileStream)

        fileStream.on('finish', () => {
          fileStream.close()
          resolve(fileName)
        })

        fileStream.on('error', (err) => {
          unlink(localPath).catch(() => {})
          reject(err)
        })
      }).on('error', reject)
    })
  }
} 
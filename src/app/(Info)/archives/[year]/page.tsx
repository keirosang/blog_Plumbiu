import ArchiveCmp from '@/components/app/Archive'
import Title from '@/components/ui/Title'
import { useGet } from '@/lib/api'

interface Props {
  params: {
    year: string
  }
}

export async function generateStaticParams() {
  const result = await useGet<IArcheveYear[]>('archives/years')

  return result.map(({ year }) => ({ year }))
}

const ArcheveYear = async ({ params }: Props) => {
  const archeveYear = await useGet<IArcheve[]>('archives?year=' + params.year)
  return (
    <>
      <Title>归档</Title>
      <ArchiveCmp archives={archeveYear} />
    </>
  )
}

export default ArcheveYear

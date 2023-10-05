import Link from 'next/link'
import Image from 'next/image'

const ListTop = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '8px 0 8px 8px',
      }}
    >
      <Link
        href="https://github.com/Plumbiu"
        style={{
          paddingTop: '10px',
        }}
      >
        <Image
          width={56}
          height={56}
          style={{
            borderRadius: '50%',
          }}
          alt={'Plumbiu'}
          src="/avatar.jpg"
        />
      </Link>
      <div
        style={{
          padding: '8px',
          marginLeft: '4px',
        }}
      >
        <div
          style={{
            paddingBottom: '4px',
            letterSpacing: '0.15px',
          }}
        >
          Plumbiu 👋
        </div>
        <div
          style={{
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            letterSpacing: '0.2px',
          }}
        >
          Studprogrammeried at Hangzhou Dianzi University (杭州电子科技大学) (HDU)，a front-end coder
        </div>
      </div>
    </div>
  )
}

export default ListTop
import { useRef, Suspense, createElement, memo } from 'react'
import Loading from '@/components/_common/Loading'
import useObserver from '../_hooks/useObservser'

interface IntersectionCustomComponentProps {
  children: any
  props?: any
}

const IntersectionComponent = memo(
  ({ children, props }: IntersectionCustomComponentProps) => {
    const observerRef = useRef<HTMLDivElement>(null)
    const isIntersecting = useObserver(observerRef)

    return (
      <div ref={observerRef}>
        <Suspense fallback={<Loading />}>
          {isIntersecting ? createElement(children, props) : null}
        </Suspense>
      </div>
    )
  },
)

export default IntersectionComponent

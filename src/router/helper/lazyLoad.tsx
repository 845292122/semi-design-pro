import { Suspense } from 'react'
import { IconLoading } from '@douyinfe/semi-icons'
import { Spin } from '@douyinfe/semi-ui'

const Loading = () => {
  return <Spin indicator={<IconLoading />} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyLoad = (Component: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  )
}

export default lazyLoad

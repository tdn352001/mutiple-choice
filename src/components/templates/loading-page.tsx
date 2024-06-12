import cx from 'clsx'
import Container from './container'
import Loading from './loading'

interface LoadingPageProps {
  className?: string
}
const LoadingPage = ({ className }: LoadingPageProps) => {
  return (
    <Container className={cx('w-full h-full', className)}>
      <Loading className="h-full" />
    </Container>
  )
}

export default LoadingPage

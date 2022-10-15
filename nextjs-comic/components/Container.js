import classNames from '@/lib/utils/classNames'

function Container({ children, className = '' }) {
  return <div className={classNames(className, 'mx-4 lg:mx-0 lg:px-8')}>{children}</div>
}

export default Container

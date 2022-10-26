import classNames from '@/lib/utils/classNames'

export default function IconBtn({ Icon, isActive, color, children, className, ...props }) {
  return (
    <button
      className={classNames(
        className,
        `btn icon-btn ${isActive ? 'icon-btn-active' : ''} ${color || ''}`
      )}
      {...props}
    >
      <span className={`${children != null ? 'mr-1' : ''}`}>
        <Icon className="mr-2" size={'1.5rem'} />
      </span>
      {children}
    </button>
  )
}

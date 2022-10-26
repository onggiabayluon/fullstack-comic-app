import SideButton from '@/components/Buttons/SideButton'
import CustomLink from '@/components/common/Link'
import { publicRoutes } from '@/lib/utils/getRoutes'
import { useRouter } from 'next/router'
import { FaCoins, FaUser } from 'react-icons/fa'

function SettingSidebar() {
  const router = useRouter()
  const navigations = [
    {
      isActive: router.pathname == publicRoutes.profile.path,
      title: 'Account Settings',
      icon: FaUser,
      href: publicRoutes.profile.path,
    },
    {
      isActive: router.pathname == publicRoutes.buycoin.path,
      title: 'Buy coin',
      icon: FaCoins,
      href: publicRoutes.buycoin.path,
    },
  ]
  return (
    <nav
      aria-label="Sidebar"
      className="sticky top-6 flex flex-col space-y-2 p-4 lg:space-y-0 lg:p-0"
    >
      {/* Your content */}
      {navigations.map((nav, index) => (
        <CustomLink key={index} href={nav.href !== router.pathname ? nav.href : undefined}>
          <SideButton isActive={nav.isActive} title={nav.title} Icon={nav.icon} />
        </CustomLink>
      ))}
    </nav>
  )
}

export default SettingSidebar

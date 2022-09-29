import CustomLink from '@/components/Link'
import MobileNav from '@/components/MobileNav'
import Search from '@/components/Search'
import ThemeSwitch from '@/components/ThemeSwitch'
import UserProfile from '@/components/UserProfile'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from 'data/siteMetadata'
import { useEffect } from 'react'

function Navbar() {
  useEffect(() => console.log('navbar re-render'))

  return (
    <header className="top-0 z-50 mx-4 lg:mx-0 lg:px-8">
      <div className="border-theme flex max-h-16 w-full items-center justify-between border-b py-4 ">
        {/* Left Logo */}
        <div>
          <CustomLink href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              <div className="mr-3 h-4 w-7">
                <Logo />
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="hidden h-6 text-xl font-semibold sm:block">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </CustomLink>
        </div>
        {/* Right navlinks */}
        <div className="flex items-center text-base leading-5">
          <div className="hidden space-x-4 sm:block sm:space-x-6 xl:hidden">
            {headerNavLinks.map((link) => (
              <CustomLink
                key={link.title}
                href={link.href}
                className="text-sm font-medium  hover:text-primary-500  dark:hover:text-primary-400"
              >
                {link.title}
              </CustomLink>
            ))}
          </div>
          <div className="ml-5 flex items-center space-x-4 border-slate-200 pl-6 dark:border-slate-800 sm:space-x-6  sm:border-l xl:border-0">
            <Search />
            <span className="hidden sm:block" aria-label="Theme Swicher">
              <ThemeSwitch />
            </span>
            <MobileNav />
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

import AvatarSkeleton from '@/components/Skeleton/AvatarSkeleton'
import { DEFAULT_MENU_ITEMS, USER_ITEMS } from '@/data/authenticationMenu'
import useFetch from '@/hooks/api/useFetch'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useLogout } from '@/hooks/useLogout'
import useUserApi from '@/services/userService'
import { useEffect, useRef, useState } from 'react'
import { FaCoins } from 'react-icons/fa'
import { useClickAway } from 'react-use'
import Spinner from '../Skeleton/Spinner'
import Image from './Image'
import tempProfileSrc from '/public/userProfile.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserProfile() {
  useEffect(() => console.log('profile re-render'))
  const { state: user, loading: loading } = useAuthContext()
  const { getCurrentUserUrl } = useUserApi()
  const { data: userDetail, isLoading: shouldShowCoinLoading } = useFetch({
    deps: user,
    url: getCurrentUserUrl.url,
    fetcher: getCurrentUserUrl.fetcher,
  })
  const { logoutUser } = useLogout()
  const items = user ? USER_ITEMS : DEFAULT_MENU_ITEMS
  const [openDropdown, setOpenDropdown] = useState(false)

  // Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'LOGIN BY USERNAME':
        return
      case 'LOGOUT':
        return logoutUser().then(setOpenDropdown(false))
      case 'LANGUAGE':
        // Handle change language
        break
      default:
    }
  }

  // Handle Toggle menu
  const toggleMenu = () => setOpenDropdown((prev) => !prev)

  // Handle Clicked outside menu => Close menu
  const handleMenuClickedOutside = () => setOpenDropdown(false)

  const menuRef = useRef(null)

  useClickAway(menuRef, handleMenuClickedOutside)

  return (
    <div className="relative ml-3">
      {loading && <AvatarSkeleton />}
      {!loading && (
        <div>
          <button
            onClick={toggleMenu}
            type="button"
            className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>

            <Image
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
              hasPlaceholder={false}
              src={
                user
                  ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  : tempProfileSrc
              }
              alt={user ? user.name : 'User Avatar'}
            />
          </button>
        </div>
      )}

      <div
        ref={menuRef}
        className={classNames(
          openDropdown ? '' : 'hidden',
          'absolute right-0 z-[100] mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex="-1"
      >
        {items.map((item, index) => {
          {
            /* Modal Menu Root */
          }
          if (item.type == 'modal') {
            const Comp = item.comp
            return (
              <Comp
                key={item.title}
                title={item.title}
                items={item.children}
                onChange={handleMenuChange}
              ></Comp>
            )
          }

          {
            /* Normal Menu Root */
          }
          if (item.type != 'modal') {
            if (index === 0) {
              return (
                <>
                  <a
                    key="coins"
                    className="bg-indigo flex flex-row items-center space-x-2 px-4 py-2 text-sm text-gray-700"
                  >
                    <span>
                      <FaCoins className="fill-yellow-400" />
                    </span>
                    <span>
                      {shouldShowCoinLoading ? (
                        <Spinner className="ml-2" />
                      ) : (
                        userDetail && userDetail.coins + ' coins'
                      )}
                    </span>
                  </a>
                  <a
                    key={item.title}
                    href={item.to}
                    className="bg-indigo block px-4 py-2 text-sm text-gray-700"
                    onClick={() => handleMenuChange(item)}
                  >
                    {item.title}
                  </a>
                </>
              )
            }
            return (
              <a
                key={item.title}
                href={item.to}
                className="bg-indigo block px-4 py-2 text-sm text-gray-700"
                onClick={() => handleMenuChange(item)}
              >
                {item.title}
              </a>
            )
          }
        })}
      </div>
    </div>
  )
}

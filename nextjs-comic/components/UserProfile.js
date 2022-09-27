import { DEFAULT_MENU_ITEMS, USER_ITEMS } from '@/data/authenticationMenu'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import Image from './Image'
import tempProfileSrc from '/public/userProfile.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Handle logic
const handleMenuChange = (menuItem) => {
  switch (menuItem.type) {
    case 'LOGIN BY USERNAME':
      return alert('test login clicked')
    case 'LOGOUT':
      // Handle logout
      return
    // return logoutUser()
    case 'LANGUAGE':
      // Handle change language
      break
    default:
  }
}

export default function UserProfile() {
  const user = false
  const items = user ? USER_ITEMS : DEFAULT_MENU_ITEMS
  const [open, setOpen] = useState(false)

  // Handle Toggle menu
  const toggleMenu = () => setOpen((prev) => !prev)

  // Handle Clicked outside menu => Close menu
  const handleMenuClickedOutside = () => setOpen(false)

  const menuRef = useRef(null)

  useClickAway(menuRef, handleMenuClickedOutside)

  return (
    <div className="relative ml-3">
      <div>
        <button
          onClick={toggleMenu}
          type="button"
          className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            src={
              user
                ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                : tempProfileSrc
            }
            alt={user ? user.name : 'User Avatar'}
            width={32}
            height={32}
          />
        </button>
      </div>

      <div
        ref={menuRef}
        className={classNames(
          open ? '' : 'hidden',
          'z-100 absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex="-1"
      >
        {items.map((item) => {
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

          if (item.type != 'modal') {
            return (
              <a
                key={item.title}
                href="#"
                className="bg-indigo block px-4 py-2 text-sm text-gray-700"
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

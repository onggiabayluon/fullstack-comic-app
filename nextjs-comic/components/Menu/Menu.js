import { Dialog, Transition } from '@headlessui/react'
import useHistories from 'hooks/useHistories'
import { Fragment, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
// import { FaChevronLeft } from 'react-icons/fa'

const MenuItem = ({ onItemClick, onCloseBtnClick, icon, title, comp }) => {
  const Item = comp
  if (comp) return <Item onCloseBtnClick={onCloseBtnClick} />
  return (
    <button
      onClick={onItemClick}
      aria-label={title}
      className="group bg-indigo flex w-full items-center rounded p-4 text-sm text-gray-500 outline outline-1 outline-gray-200"
    >
      <span className="icon-indigo group-hover:text-white">{icon}</span>
      <span className="w-full text-center font-medium">{title}</span>
    </button>
  )
}

function Menu({ title, items, onChange }) {
  let [isOpen, setIsOpen] = useState(false)

  const [lastMenuItem, handleMenuItemClick, backToRoot, histories, setHistories, back] =
    useHistories({
      items: items,
      onChange: onChange,
    })

  const shouldShowHeader = histories?.length > 1

  function handleCloseModal() {
    setIsOpen(false)
    backToRoot()
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <a href="#" className="bg-indigo block px-4 py-2 text-sm text-gray-700" onClick={openModal}>
        {title}
      </a>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog open={isOpen} as="div" className="relative z-50" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="z-100 fixed inset-0 overflow-y-auto">
            <div className="z-100 relative flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="mx-auto mb-2 pb-2 text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    {shouldShowHeader && (
                      <button
                        type="button"
                        className="absolute left-10 mt-2 cursor-pointer"
                        onClick={back}
                        aria-label="back"
                      >
                        <FaChevronLeft size={15} />
                      </button>
                    )}
                    <h3 className="mx-auto w-fit border-b-2 border-slate-100 pb-1 text-xl">
                      {lastMenuItem?.title}
                    </h3>
                    <button
                      type="button"
                      className="absolute right-10 top-5 mt-[0.45rem] cursor-pointer"
                      onClick={handleCloseModal}
                      aria-label="Close"
                    >
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </Dialog.Title>
                  <div className="mt-2 space-y-3">
                    {lastMenuItem?.data.map((item, index) => (
                      <MenuItem
                        onItemClick={() => handleMenuItemClick(item)}
                        key={item.title || index}
                        icon={item.icon}
                        title={item.title}
                        comp={item.comp}
                        onCloseBtnClick={handleCloseModal}
                      ></MenuItem>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Menu

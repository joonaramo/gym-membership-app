import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/outline'
import { classNames } from '../../utils/helpers'

const ProfileMenu = ({ isAuthenticated, logOut, links, buttons }) => {
  return (
    <Menu as='div' className='ml-3 relative'>
      {({ open }) => (
        <>
          <div>
            <Menu.Button className='bg-gray-800 text-gray-400 hover:text-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
              <span className='sr-only'>Open user menu</span>
              <UserCircleIcon className='h-6 w-6' aria-hidden='true' />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items
              static
              className='z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
            >
              {links
                .filter((item) =>
                  isAuthenticated ? item.authLink : !item.authLink
                )
                .map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        to={item.href}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              {buttons
                .filter((item) =>
                  isAuthenticated ? item.authLink : !item.authLink
                )
                .map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <button
                        onClick={item.onClick === 'logOut' && logOut}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block w-full text-left px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default ProfileMenu

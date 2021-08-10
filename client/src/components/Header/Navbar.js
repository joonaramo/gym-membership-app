import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  MenuIcon,
  XIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { classNames } from '../../utils/helpers';
import { logout } from '../../actions/auth';
import { useHistory } from 'react-router';

const profileMenuLinks = [
  { name: 'Log in', href: '/login', authLink: false },
  {
    name: 'Sign up',
    href: '/signup',
    authLink: false,
  },
  { name: 'Your profile', href: '/profile', authLink: true },
];
const profileMenuButtons = [
  { name: 'Log out', onClick: 'logOut', authLink: true },
];
const ProfileMenu = ({ isAuthenticated, logOut }) => {
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
              {profileMenuLinks
                .filter((item) =>
                  isAuthenticated ? item.authLink : !item.authLink
                )
                .map((item) => (
                  <Menu.Item>
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
              {profileMenuButtons
                .filter((item) =>
                  isAuthenticated ? item.authLink : !item.authLink
                )
                .map((item) => (
                  <Menu.Item>
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
  );
};

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const history = useHistory();

  const logOut = async () => {
    await logout();
    history.push('/');
  };

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <Link to='/'>
                    <img
                      className='block lg:hidden h-8 w-auto'
                      src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                      alt='Workflow'
                    />
                  </Link>
                  <Link to='/'>
                    <img
                      className='hidden lg:block h-8 w-auto'
                      src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                      alt='Workflow'
                    />
                  </Link>
                </div>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <Link
                      to='/'
                      className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    >
                      Home
                    </Link>
                    <a
                      href='/#about'
                      className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    >
                      About
                    </a>
                    <a
                      href='/#pricing'
                      className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    >
                      Pricing
                    </a>
                    <a
                      href='/#find-us'
                      className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    >
                      Find us
                    </a>
                  </div>
                </div>
              </div>
              <div className='hidden sm:ml-6 sm:block'>
                <div className='flex items-center'>
                  {user?.is_admin && (
                    <Link
                      to='/admin'
                      className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 mr-4 rounded-md text-sm font-medium'
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to='/cart'
                    className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                  >
                    <span className='sr-only'>Shopping Cart</span>
                    <ShoppingCartIcon className='h-6 w-6' aria-hidden='true' />
                  </Link>
                  <ProfileMenu
                    isAuthenticated={isAuthenticated}
                    logOut={logOut}
                  />
                </div>
              </div>
              <div className='-mr-2 flex sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              <a
                href='/'
                className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
              >
                Home
              </a>
              <a
                href='/#about'
                className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
              >
                About
              </a>
              <a
                href='/#pricing'
                className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
              >
                Pricing
              </a>
              <a
                href='/#find-us'
                className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
              >
                Find us
              </a>
            </div>
            <div className='pt-4 pb-3 border-t border-gray-700'>
              <div className='flex items-center px-5'>
                <div className='flex-shrink-0'>
                  <UserCircleIcon
                    className='h-8 w-8 text-gray-200'
                    aria-hidden='true'
                  />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium text-white'>
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className='text-sm font-medium text-gray-400'>
                    {user?.email}
                  </div>
                </div>
                <Link
                  to='/cart'
                  className='ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                >
                  <span className='sr-only'>View shopping cart</span>
                  <ShoppingCartIcon className='h-6 w-6' aria-hidden='true' />
                </Link>
              </div>
              <div className='mt-3 px-2 space-y-1'>
                {profileMenuLinks
                  .filter((item) =>
                    isAuthenticated ? item.authLink : !item.authLink
                  )
                  .map((item) => (
                    <Link
                      to={item.href}
                      className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                    >
                      {item.name}
                    </Link>
                  ))}
                {profileMenuButtons
                  .filter((item) =>
                    isAuthenticated ? item.authLink : !item.authLink
                  )
                  .map((item) => (
                    <button
                      onClick={item.onClick === 'logOut' && logOut}
                      className='block w-full text-left  px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                    >
                      {item.name}
                    </button>
                  ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Disclosure, Popover, Transition } from '@headlessui/react';
import {
  MenuIcon,
  XIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { classNames } from '../../utils/helpers';
import { logout } from '../../actions/auth';
import { getAllCategories } from '../../actions/category';
import { useHistory } from 'react-router';
import ProfileMenu from './ProfileMenu';

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

const SubCategoryItem = ({ subCategory, ml }) => {
  return (
    <>
      <li key={subCategory.name} className={`flex ml-${ml}`}>
        <Link
          to={`/shop?category=${subCategory.id}`}
          className='hover:text-gray-800'
        >
          {subCategory.name}
        </Link>
      </li>
      {subCategory.sub_categories?.map((subCategory) => (
        <SubCategoryItem ml={ml + 1} subCategory={subCategory} />
      ))}
    </>
  );
};

const Navbar = ({
  auth: { isAuthenticated, user },
  categories,
  getAllCategories,
  logout,
}) => {
  const history = useHistory();

  useEffect(() => {
    getAllCategories();
  }, []);

  const logOut = async () => {
    await logout();
    history.push('/');
  };

  const navigation = {
    pages: [
      { name: 'Home', to: '/' },
      { name: 'About', href: '/#about' },
      { name: 'Pricing', href: '/#pricing' },
      { name: 'Find us', href: '/#find-us' },
    ],
  };

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
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
                <Popover.Group className='hidden sm:block sm:ml-6'>
                  <div className='flex'>
                    {navigation.pages.map((page) =>
                      page.href ? (
                        <a
                          key={page.name}
                          href={page.href}
                          className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 mr-4 rounded-md text-sm font-medium'
                        >
                          {page.name}
                        </a>
                      ) : (
                        <Link
                          key={page.name}
                          to={page.to}
                          className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 mr-4 rounded-md text-sm font-medium'
                        >
                          {page.name}
                        </Link>
                      )
                    )}
                    {categories
                      ?.filter((category) => !category.parent_category)
                      .map((category) => (
                        <Popover key={category.id} className='flex'>
                          {({ open }) => (
                            <>
                              <div className='relative flex'>
                                {category.sub_categories.length > 0 ? (
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                      'mr-4 px-3 py-2 rounded-md text-sm font-medium'
                                    )}
                                  >
                                    {category.name}
                                  </Popover.Button>
                                ) : (
                                  <Link
                                    key={category.id}
                                    to={`/shop?category=${category.id}`}
                                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 mr-4 rounded-md text-sm font-medium'
                                  >
                                    {category.name}
                                  </Link>
                                )}
                              </div>

                              <Transition
                                as={Fragment}
                                enter='transition ease-out duration-200'
                                enterFrom='opacity-0'
                                enterTo='opacity-100'
                                leave='transition ease-in duration-150'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                              >
                                <Popover.Panel className='absolute top-full inset-x-0 z-10 text-gray-500 sm:text-sm'>
                                  {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                  <div
                                    className='absolute inset-0 top-1/2 bg-white shadow'
                                    aria-hidden='true'
                                  />

                                  <div className='relative bg-white'>
                                    <div className='max-w-7xl mx-auto px-8'>
                                      <div className='grid grid-cols-1 items-start gap-y-10 gap-x-8 pt-10 pb-12'>
                                        <div className='grid grid-cols-4 gap-y-10 gap-x-8'>
                                          {category.sub_categories.map(
                                            (subCategory) => (
                                              <div>
                                                <Link
                                                  to={`/shop?category=${subCategory.id}`}
                                                  id={`desktop-featured-heading-${subCategory.id}`}
                                                  className='font-medium text-gray-900'
                                                >
                                                  {subCategory.name}
                                                </Link>
                                                <ul
                                                  aria-labelledby={`desktop-featured-heading-${subCategory.id}`}
                                                  className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'
                                                >
                                                  {subCategory.sub_categories?.map(
                                                    (subCategory) => (
                                                      <SubCategoryItem
                                                        subCategory={
                                                          subCategory
                                                        }
                                                        ml={1}
                                                      />
                                                    )
                                                  )}
                                                </ul>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ))}
                  </div>
                </Popover.Group>
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
                    links={profileMenuLinks}
                    buttons={profileMenuButtons}
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
                      key={item.name}
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
                      key={item.name}
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
  categories: state.category.allCategories,
});

export default connect(mapStateToProps, { logout, getAllCategories })(Navbar);

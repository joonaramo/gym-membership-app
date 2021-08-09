import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  HomeIcon,
  CreditCardIcon,
  UserGroupIcon,
  DocumentReportIcon,
  ShoppingCartIcon,
  TagIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/outline';

import Sidebar from './Sidebar';
import Header from './Header';
import PageHeader from './PageHeader';

const AdminPanel = ({
  component: Component,
  auth: { isAuthenticated, user, loading },
  ...rest
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState([
    { name: 'Home', href: '/admin', icon: HomeIcon, current: true },
    {
      name: 'Users',
      href: '/admin/users',
      icon: UserGroupIcon,
      current: false,
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: ShoppingCartIcon,
      current: false,
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: CreditCardIcon,
      current: false,
    },
    {
      name: 'Memberships',
      href: '/admin/memberships',
      icon: DocumentReportIcon,
      current: false,
    },
    {
      name: 'Coupons',
      href: '/admin/coupons',
      icon: TagIcon,
      current: false,
    },
  ]);
  const [secondaryNavigation, setSecondaryNavigation] = useState([
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: CogIcon,
      current: false,
    },
    { name: 'Help', href: '#', icon: QuestionMarkCircleIcon, current: false },
    { name: 'Privacy', href: '#', icon: ShieldCheckIcon, current: false },
  ]);

  const setCurrent = (name) => {
    const updatedNavigation = navigation.map((item) => {
      return {
        ...item,
        current: item.name === name ? true : false,
      };
    });
    setNavigation(updatedNavigation);
    const updatedSecondaryNavigation = secondaryNavigation.map((item) => {
      return {
        ...item,
        current: item.name === name ? true : false,
      };
    });
    setSecondaryNavigation(updatedSecondaryNavigation);
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <p>Loading...</p>
        ) : !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : user?.is_admin && !loading ? (
          <div className='h-screen flex overflow-hidden bg-gray-100'>
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              navigation={navigation}
              secondaryNavigation={secondaryNavigation}
              setCurrent={setCurrent}
            />
            <div className='flex-1 overflow-auto focus:outline-none'>
              <Header user={user} setSidebarOpen={setSidebarOpen} />
              <main className='flex-1 relative pb-8 z-0 overflow-y-auto'>
                <PageHeader />
                <div className='mt-8'>
                  <Component setCurrent={setCurrent} {...props} />
                </div>
              </main>
            </div>
          </div>
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminPanel);

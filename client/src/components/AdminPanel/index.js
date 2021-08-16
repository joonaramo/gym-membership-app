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
  ViewListIcon,
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
      name: 'Categories',
      href: '/admin/categories',
      icon: ViewListIcon,
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
            <div className='flex flex-col flex-1 min-h-screen overflow-auto focus:outline-none'>
              <Header
                current={
                  navigation.find((item) => item.current) ||
                  secondaryNavigation.find((item) => item.current)
                }
                user={user}
                setSidebarOpen={setSidebarOpen}
              />
              <main className='flex flex-col flex-1 relative z-0 overflow-y-auto'>
                <PageHeader />
                <div className='my-auto py-8'>
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

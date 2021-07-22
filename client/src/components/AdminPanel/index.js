import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  HomeIcon,
  ScaleIcon,
  CreditCardIcon,
  UserGroupIcon,
  DocumentReportIcon,
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
    { name: 'Balances', href: '#', icon: ScaleIcon, current: false },
    { name: 'Cards', href: '#', icon: CreditCardIcon, current: false },
    { name: 'Reports', href: '#', icon: DocumentReportIcon, current: false },
  ]);

  const setCurrent = (name) => {
    const updatedNavigation = navigation.map((item) => {
      return {
        ...item,
        current: item.name === name ? true : false,
      };
    });
    setNavigation(updatedNavigation);
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !user?.is_admin && !loading ? (
          <Redirect to='/login' />
        ) : (
          <div className='h-screen flex overflow-hidden bg-gray-100'>
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              navigation={navigation}
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
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminPanel);

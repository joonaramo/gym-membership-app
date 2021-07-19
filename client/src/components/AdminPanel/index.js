import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import Header from './Header';
import PageHeader from './PageHeader';

const AdminPanel = ({
  component: Component,
  auth: { isAuthenticated, user, loading },
  ...rest
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <div className='h-screen flex overflow-hidden bg-gray-100'>
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div className='flex-1 overflow-auto focus:outline-none'>
              <Header user={user} setSidebarOpen={setSidebarOpen} />
              <main className='flex-1 relative pb-8 z-0 overflow-y-auto'>
                <PageHeader />
                <div className='mt-8'>
                  <Component {...props} />
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

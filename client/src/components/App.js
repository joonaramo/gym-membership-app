import React, { useEffect } from 'react';
import Header from './Header';
import Router from './Router';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadUser } from '../actions/auth';

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default connect(null, { loadUser })(App);

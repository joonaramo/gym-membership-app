import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Alert from '../Auth/Alert';
import { useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes('/admin') && <Navbar />}
      <Alert />
    </>
  );
};

export default Header;

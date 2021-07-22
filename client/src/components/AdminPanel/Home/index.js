import React, { useEffect } from 'react';
import { ScaleIcon } from '@heroicons/react/outline';
import Activity from './Activity';
import Overview from './Overview';

const cards = [
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  // More items...
];

const Home = ({ setCurrent }) => {
  useEffect(() => {
    setCurrent('Home');
  }, []);
  return (
    <>
      <Overview cards={cards} />
      <Activity />
    </>
  );
};

export default Home;

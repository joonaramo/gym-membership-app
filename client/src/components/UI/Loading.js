import React from 'react';
import { classNames } from '../../utils/helpers';

const Loading = ({ color = 'black', fullScreen = false }) => {
  return (
    <div
      className={classNames(
        fullScreen ? 'min-h-screen' : '',
        `flex justify-center items-center bg-${color}`
      )}
    >
      <div className='loader bg-white p-5 rounded-full flex space-x-3'>
        <div className='w-5 h-5 bg-gray-800 rounded-full animate-bounce'></div>
        <div className='w-5 h-5 bg-gray-800 rounded-full animate-bounce'></div>
        <div className='w-5 h-5 bg-gray-800 rounded-full animate-bounce'></div>
      </div>
    </div>
  );
};

export default Loading;

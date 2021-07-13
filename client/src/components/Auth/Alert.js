import React from 'react';
import { useSelector } from 'react-redux';
import { ExclamationIcon } from '@heroicons/react/solid';

const Alert = () => {
  const notification = useSelector((state) => state.notification.message);
  if (notification) {
    return (
      <div className='rounded-md bg-red-400 text-red-100 p-4 sm:mx-auto sm:w-full sm:max-w-md mt-8'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <ExclamationIcon className='h-5 w-5' aria-hidden='true' />
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium'>Error</h3>
            <div className='mt-2 text-sm'>
              <p>{notification}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Alert;

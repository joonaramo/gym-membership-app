import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification.message);
  if (notification) {
    return (
      <div className='relative bg-indigo-600'>
        <div className='max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8'>
          <div className='pr-16 sm:text-center sm:px-16'>
            <p className='font-medium text-white'>
              <span className='md:hidden'>We announced a new product!</span>
              <span className='hidden md:inline'>
                Big news! We're excited to announce a brand new product.
              </span>
              <span className='block sm:ml-2 sm:inline-block'>
                <a href='#' className='text-white font-bold underline'>
                  {' '}
                  Learn more <span aria-hidden='true'>&rarr;</span>
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Notification;

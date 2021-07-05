import React from 'react';
import { classNames } from '../../../util/helpers';

const Text = ({ reversed }) => {
  return (
    <div className='relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16'>
      <div
        className={classNames(
          reversed ? '' : 'md:ml-auto md:pl-10',
          'md:w-1/2'
        )}
      >
        <h2 className='text-base font-semibold uppercase tracking-wider text-gray-300'>
          A gym for everyone
        </h2>
        <p className='mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl'>
          Over 9000 machines to workout on
        </p>
        <p className='mt-3 text-lg text-gray-300'>
          Whether you are a professional weightlifter or completely new to
          training, we have all the equipment and space you possibly need to
          start your journey towards your fitness goals!
        </p>
        <div className='mt-8'>
          <div className='inline-flex rounded-md shadow'>
            <a
              href='#'
              className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50'
            >
              Check the pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;

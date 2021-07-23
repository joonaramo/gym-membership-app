import React from 'react';
import { SpeakerphoneIcon } from '@heroicons/react/outline';

const Notification = ({ save }) => {
  return (
    <div className='fixed inset-x-0 bottom-0'>
      <div className='bg-indigo-600'>
        <div className='max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between flex-wrap'>
            <div className='w-0 flex-1 flex items-center'>
              <span className='flex p-2 rounded-lg bg-indigo-800'>
                <SpeakerphoneIcon
                  className='h-6 w-6 text-white'
                  aria-hidden='true'
                />
              </span>
              <p className='ml-3 font-medium text-white truncate'>
                <span className='md:hidden'>You have unsaved changes!</span>
                <span className='hidden md:inline'>
                  You have unsaved changes!
                </span>
              </p>
            </div>
            <div className='mt-0 flex-shrink-0 sm:w-auto'>
              <button
                onClick={() => save()}
                className='flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;

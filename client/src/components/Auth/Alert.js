import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ExclamationIcon, XIcon } from '@heroicons/react/solid';
import { setNotification } from '../../actions/notification';

const Alert = () => {
  const notification = useSelector((state) => state.notification.message);
  const dispatch = useDispatch();
  if (notification) {
    return (
      <div className='z-50 fixed bottom-0 inset-x-0 pb-2 sm:pb-5'>
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
            <div className='ml-auto pl-3'>
              <div className='-mx-1.5 -my-1.5'>
                <button
                  onClick={() => dispatch(setNotification('', 0))}
                  type='button'
                  className='inline-flex bg-red-400 rounded-md p-1.5 text-red-100 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-red-600'
                >
                  <span className='sr-only'>Dismiss</span>
                  <XIcon className='h-5 w-5' aria-hidden='true' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Alert;

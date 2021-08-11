import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ExclamationIcon, XIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { setNotification } from '../../actions/notification';
import { classNames } from '../../utils/helpers';

const Alert = () => {
  const { message, type = 'ERROR' } = useSelector(
    (state) => state.notification
  );
  const dispatch = useDispatch();
  if (message) {
    return (
      <div className='z-50 fixed bottom-0 inset-x-0 pb-2 sm:pb-5'>
        <div
          className={classNames(
            type === 'SUCCESS'
              ? 'bg-green-500 text-green-50'
              : 'bg-red-400 text-red-100',
            'rounded-md p-4 sm:mx-auto sm:w-full sm:max-w-md mt-8'
          )}
        >
          <div className='flex'>
            <div className='flex-shrink-0'>
              {type === 'ERROR' ? (
                <ExclamationIcon className='h-5 w-5' aria-hidden='true' />
              ) : (
                <ThumbUpIcon className='h-5 w-5' aria-hidden='true' />
              )}
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium capitalize'>
                {type === 'ERROR' ? 'Error' : 'Success'}
              </h3>
              <div className='mt-2 text-sm'>
                <p>{message}</p>
              </div>
            </div>
            <div className='ml-auto pl-3'>
              <div className='-mx-1.5 -my-1.5'>
                <button
                  onClick={() => dispatch(setNotification('', 0))}
                  type='button'
                  className={classNames(
                    type === 'SUCCESS'
                      ? 'bg-green-500 text-green-50 hover:bg-green-400 focus:ring-offset-green-50 focus:ring-green-700'
                      : 'bg-red-400 text-red-100 hover:bg-red-300 focus:ring-offset-red-50 focus:ring-red-600',
                    'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2'
                  )}
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

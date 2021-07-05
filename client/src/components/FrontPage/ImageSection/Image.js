import React from 'react';
import { classNames } from '../../../util/helpers';

const Image = ({ reversed }) => {
  return (
    <div
      className={classNames(
        reversed ? 'md:right-0' : 'md:left-0',
        'h-56 bg-indigo-600 sm:h-72 md:absolute md:h-full md:w-1/2'
      )}
    >
      <img
        className='w-full h-full object-cover'
        src='https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply'
        alt=''
      />
    </div>
  );
};

export default Image;

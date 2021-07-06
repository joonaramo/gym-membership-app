import React from 'react';
import { classNames } from '../../../utils/helpers';

const Image = ({ reversed, imageUrl }) => {
  console.log(imageUrl);
  return (
    <div
      className={classNames(
        reversed ? 'md:right-0' : 'md:left-0',
        'h-56 bg-indigo-600 sm:h-72 md:absolute md:h-full md:w-1/2'
      )}
    >
      <img className='w-full h-full object-cover' src={imageUrl} alt='' />
    </div>
  );
};

export default Image;

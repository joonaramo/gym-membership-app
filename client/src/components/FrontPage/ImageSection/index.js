import React from 'react';
import Image from './Image';
import Text from './Text';

const ImageSection = ({ reversed }) => {
  return (
    <div className='relative bg-gray-800'>
      <Image reversed={reversed} />
      <Text reversed={reversed} />
    </div>
  );
};

export default ImageSection;

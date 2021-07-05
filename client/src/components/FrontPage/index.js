import React from 'react';
import Hero from './Hero';
import ImageSection from './ImageSection/';

const FrontPage = () => {
  return (
    <>
      <Hero />
      <ImageSection reversed={true} />
      <ImageSection reversed={false} />
    </>
  );
};

export default FrontPage;

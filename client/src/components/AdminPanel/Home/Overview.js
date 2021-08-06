import React from 'react';
import Card from './Card';

const Overview = ({ cards }) => {
  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h2 className='text-lg leading-6 font-medium text-gray-900'>Overview</h2>
      <div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {cards.map((card) => (
          <Card key={card.name} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Overview;

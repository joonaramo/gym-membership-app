import React, { useEffect } from 'react';

const SearchResults = ({ searchResults }) => {
  useEffect(() => {
    console.log(searchResults, 'results');
  }, [searchResults]);

  if (!searchResults.length > 0) {
    return null;
  }

  return (
    <div className='w-full'>
      <div className='flow-root mt-6'>
        <ul className='-my-5 divide-y divide-gray-200'>
          {searchResults.map((res) => (
            <li key={res.id} className='py-4'>
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  {/* <img className="h-8 w-8 rounded-full" src={person.imageUrl} alt="" /> */}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-900 truncate'>
                    {res.first_name} {res.last_name}
                  </p>
                  <p className='text-sm text-gray-500 truncate'>{res.email}</p>
                </div>
                <div>
                  <a
                    href='#'
                    className='inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50'
                  >
                    View
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-6'>
        <a
          href='#'
          className='w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
        >
          View all
        </a>
      </div>
    </div>
  );
};

export default SearchResults;

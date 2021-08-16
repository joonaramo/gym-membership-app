import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ searchResults, setSearchResults, name }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const path = name.toLowerCase();
  useEffect(() => {
    switch (name) {
      case 'Users':
        setTitle('full_name');
        setSubtitle('email');
        setSearchResults([]);
        break;
      case 'Products':
        setTitle('name');
        setSubtitle('reference');
        setSearchResults([]);
        break;
      case 'Orders':
        setTitle('id');
        setSubtitle('user');
        setSearchResults([]);
        break;
      case 'Memberships':
        setTitle('id');
        setSubtitle('user');
        setSearchResults([]);
        break;
      case 'Coupons':
        setTitle('code');
        setSubtitle('value');
        setSearchResults([]);
        break;
      case 'Categories':
        setTitle('name');
        setSubtitle('description');
        setSearchResults([]);
        break;
      default:
        break;
    }
  }, [name]);

  const getTitle = (res) => {
    return res[title];
  };

  const getSubtitle = (res) => {
    if (subtitle === 'value') {
      return `${res[subtitle]}€`;
    } else if (subtitle === 'user') {
      return res[subtitle].full_name;
    }
    return res[subtitle];
  };

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
                    {getTitle(res)}
                  </p>
                  <p className='text-sm text-gray-500 truncate'>
                    {getSubtitle(res)}
                  </p>
                </div>
                <div>
                  <Link
                    to={`/admin/${path}/${res.id}`}
                    className='inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50'
                  >
                    View
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-6'></div>
    </div>
  );
};

export default SearchResults;

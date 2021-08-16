import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../actions/user';
import { getAllProducts } from '../../../actions/product';
import { getAllOrders } from '../../../actions/order';
import { getAllMemberships } from '../../../actions/membership';
import { getAllCoupons } from '../../../actions/coupon';
import { getAllCategories } from '../../../actions/category';
import { SearchIcon } from '@heroicons/react/solid';

const Search = ({ name, setSearchResults }) => {
  const [searchValue, setSearchValue] = useState('');
  const { allUsers } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.product);
  const { allOrders } = useSelector((state) => state.order);
  const { allMemberships } = useSelector((state) => state.membership);
  const { allCoupons } = useSelector((state) => state.coupon);
  const { allCategories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    switch (name) {
      case 'Users':
        search(allUsers, getAllUsers);
        break;
      case 'Products':
        search(allProducts, getAllProducts);
        break;
      case 'Orders':
        search(allOrders, getAllOrders);
        break;
      case 'Memberships':
        search(allMemberships, getAllMemberships);
        break;
      case 'Coupons':
        search(allCoupons, getAllCoupons);
        break;
      case 'Categories':
        search(allCategories, getAllCategories);
        break;
      default:
        break;
    }
  }, [searchValue]);

  useEffect(() => {
    setSearchValue('');
  }, [name]);

  const search = (arrToSearch, getArr) => {
    if (!arrToSearch.length > 0) {
      dispatch(getArr());
    }
    if (!searchValue) {
      setSearchResults([]);
    } else {
      console.log(arrToSearch);
      let searchResults = arrToSearch.filter((obj) => {
        const objMatchesText = (text, obj) => {
          if (typeof obj === 'string') {
            return obj.toLowerCase().includes(text.toLowerCase());
          }
          if (obj) {
            return Object.values(obj).some((val) => objMatchesText(text, val));
          }
          return false;
        };
        if (objMatchesText(searchValue, obj)) {
          return true;
        } else {
          return false;
        }
      });
      setSearchResults(searchResults);
    }
  };

  return (
    <div className='flex-1 flex'>
      <div className='w-full flex md:ml-0'>
        <label htmlFor='search-field' className='sr-only'>
          Search
        </label>
        <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
          <div
            className='absolute inset-y-0 left-0 flex items-center pointer-events-none'
            aria-hidden='true'
          >
            <SearchIcon className='h-5 w-5' aria-hidden='true' />
          </div>
          <input
            id='search-field'
            name='search-field'
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm'
            placeholder={`Search ${name}`}
            type='search'
          />
        </div>
      </div>
    </div>
  );
};

export default Search;

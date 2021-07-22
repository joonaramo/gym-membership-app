import React, { useEffect } from 'react';
import { ChevronRightIcon, UserIcon, XIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../actions/product';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/outline';

const Products = ({ setCurrent }) => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrent('Products');
    dispatch(getProducts());
  }, []);

  return (
    <>
      <h2 className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        Products
      </h2>
      {/* Activity list (smallest breakpoint only) */}
      <div className='shadow sm:hidden'>
        <ul className='mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden'>
          {products.map((user) => (
            <li key={user.id}>
              <Link
                to={`/admin/users/${user.id}`}
                className='block px-4 py-4 bg-white hover:bg-gray-50'
              >
                <span className='flex items-center space-x-4'>
                  <span className='flex-1 flex space-x-2 truncate'>
                    <UserIcon
                      className='flex-shrink-0 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='flex flex-col text-gray-500 text-sm truncate'>
                      <span className='truncate'>
                        {user.first_name} {user.last_name} ({user.email})
                      </span>
                      <span>
                        <span className='text-gray-900 font-medium'>
                          Membership
                        </span>
                      </span>
                      <time dateTime={user.datetime}>{user.date}</time>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className='flex-shrink-0 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <nav
          className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200'
          aria-label='Pagination'
        >
          <div className='flex-1 flex justify-between'>
            <button className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500'>
              Previous
            </button>
            <button className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500'>
              Next
            </button>
          </div>
        </nav>
      </div>

      {/* Activity table (small breakpoint and up) */}
      <div className='hidden sm:block'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col mt-2'>
            <div className='align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Name & Reference
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Purchased
                    </th>
                    <th className='hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block'>
                      Price
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Income
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {products.map((product) => (
                    <tr key={product.id} className='bg-white'>
                      <td className='max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        <div className='flex'>
                          <Link
                            to={`/admin/products/${product.id}`}
                            className='group inline-flex space-x-2 truncate text-sm'
                          >
                            <UserIcon
                              className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                              aria-hidden='true'
                            />
                            <p className='text-gray-500 truncate group-hover:text-gray-900'>
                              {product.name} ({product.reference})
                            </p>
                          </Link>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {product.times_purchased} times
                      </td>
                      <td className='hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block'>
                        {product.unit_price / 100}€
                      </td>
                      <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                        {product.times_purchased * (product.unit_price / 100)}€
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <nav
                className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'
                aria-label='Pagination'
              >
                <div className='hidden sm:block'>
                  <p className='text-sm text-gray-700'>
                    Showing <span className='font-medium'>1</span> to{' '}
                    <span className='font-medium'>{products.length}</span> of{' '}
                    <span className='font-medium'>{products.length}</span>{' '}
                    results
                  </p>
                </div>
                <div className='flex-1 flex justify-between sm:justify-end'>
                  <button className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
                    Previous
                  </button>
                  <button className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
                    Next
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

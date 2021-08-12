import React, { useState, useEffect } from 'react';
import {
  ChevronRightIcon,
  UserIcon,
  XIcon,
  CheckIcon,
} from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCoupons } from '../../../actions/coupon';
import { getOrders } from '../../../actions/order';
import CreateCoupon from './CreateCoupon';
import Pagination from '../UI/Pagination';

const Coupons = ({ setCurrent }) => {
  const [creating, setCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const { coupons, totalDocs, limit, pagingCounter, hasPrevPage, hasNextPage } =
    useSelector((state) => state.coupon);
  const { orders = [] } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrent('Coupons');
    dispatch(getCoupons(currentPage, currentLimit));
  }, [currentPage, currentLimit]);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const getOrdersWithKlarnaId = (order_ids) => {
    return orders.filter((order) => order_ids.includes(order.order_id));
  };

  if (creating) {
    return <CreateCoupon setCreating={setCreating} />;
  }
  return (
    <>
      <div className='flex-1 flex justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-lg leading-6 font-medium text-gray-900'>Coupons</h2>
        <button
          onClick={() => setCreating(true)}
          className='inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
        >
          New coupon
        </button>
      </div>
      {/* Activity list (smallest breakpoint only) */}
      <div className='shadow sm:hidden'>
        <ul className='mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden'>
          {coupons.map((coupon) => (
            <li key={coupon.id}>
              <Link
                to={`/admin/coupons/${coupon.id}`}
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
                        <span className='text-gray-900 font-medium'>
                          Coupon
                        </span>{' '}
                        {coupon.code}
                      </span>
                      <span>
                        <span className='text-gray-900 font-medium'>Value</span>{' '}
                        {coupon.value}€
                      </span>
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
                      Code
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Value
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Used
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Active
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {coupons.map((coupon) => (
                    <tr key={coupon.id} className='bg-white'>
                      <td className='max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        <div className='flex'>
                          <Link
                            to={`/admin/coupons/${coupon.id}`}
                            className='group inline-flex space-x-2 truncate text-sm'
                          >
                            <UserIcon
                              className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                              aria-hidden='true'
                            />
                            <p className='text-gray-500 truncate group-hover:text-gray-900'>
                              {coupon.code}
                            </p>
                          </Link>
                        </div>
                      </td>
                      <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                        {coupon.value}€
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {getOrdersWithKlarnaId(coupon.orders).length} times
                      </td>
                      <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                        {coupon.active ? (
                          <CheckIcon
                            className='flex-shrink-0 h-5 w-5 m-auto text-green-400 group-hover:text-gray-500'
                            aria-hidden='true'
                          />
                        ) : (
                          <XIcon
                            className='flex-shrink-0 h-5 w-5 m-auto text-red-400 group-hover:text-gray-500'
                            aria-hidden='true'
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pagingCounter={pagingCounter}
                limit={limit}
                totalDocs={totalDocs}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupons;

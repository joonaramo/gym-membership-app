import React, { useEffect, useState } from 'react';
import {
  ChevronRightIcon,
  UserIcon,
  XIcon,
  CheckIcon,
} from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getMemberships } from '../../../actions/membership';
import Pagination from '../UI/Pagination';

const Memberships = ({ setCurrent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const {
    memberships,
    totalDocs,
    limit,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
  } = useSelector((state) => state.membership);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrent('Memberships');
    dispatch(getMemberships(currentPage, currentLimit));
  }, [currentPage, currentLimit]);

  return (
    <>
      <div className='flex-1 flex justify-between max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8'>
        <h2 className='text-lg leading-6 font-medium text-gray-900'>
          Memberships
        </h2>
      </div>
      {/* Activity list (smallest breakpoint only) */}
      <div className='shadow sm:hidden'>
        <ul className='mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden'>
          {memberships.map((membership) => (
            <li key={membership.id}>
              <Link
                to={`/admin/memberships/${membership.id}`}
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
                          Membership ID
                        </span>{' '}
                        {membership.id}
                      </span>
                      <span>
                        <span className='text-gray-900 font-medium'>
                          Started at
                        </span>{' '}
                        {format(
                          new Date(membership.start_date),
                          'dd.MM.yyyy HH:mm'
                        )}
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
                      Membership ID
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      User
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Start Date
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {memberships.map((membership) => (
                    <tr key={membership.id} className='bg-white'>
                      <td className='max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        <div className='flex'>
                          <Link
                            to={`/admin/memberships/${membership.id}`}
                            className='group inline-flex flex-1 space-x-2 truncate text-sm'
                          >
                            <UserIcon
                              className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                              aria-hidden='true'
                            />
                            <p className='text-gray-500 truncate group-hover:text-gray-900'>
                              {membership.id}
                            </p>
                          </Link>
                        </div>
                      </td>
                      <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                        <p className='truncate'>
                          {membership.user.first_name}{' '}
                          {membership.user.last_name}
                        </p>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {format(
                          new Date(membership.start_date),
                          'dd.MM.yyyy HH:mm'
                        )}
                      </td>
                      <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                        {format(
                          new Date(membership.end_date),
                          'dd.MM.yyyy HH:mm'
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

export default Memberships;

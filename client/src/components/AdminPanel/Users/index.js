import React, { useEffect, useState } from 'react';
import {
  ChevronRightIcon,
  UserIcon,
  XIcon,
  CheckIcon,
} from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../../actions/user';
import { Link } from 'react-router-dom';
import Pagination from '../UI/Pagination';

const Users = ({ setCurrent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const { users, totalDocs, limit, pagingCounter, hasPrevPage, hasNextPage } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrent('Users');
    dispatch(getUsers(currentPage, currentLimit));
  }, [currentPage, currentLimit]);

  const hasActiveMembership = (user) => {
    return user.memberships.some(
      (membership) => new Date(membership.end_date > Date.now())
    );
  };

  const calcAge = (user) => {
    const today = new Date();
    const birthDate = new Date(user.birth_date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <>
      <h2 className='max-w-6xl mx-auto px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        Users
      </h2>
      {/* Activity list (smallest breakpoint only) */}
      <div className='shadow sm:hidden'>
        <ul className='mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden'>
          {users.map((user) => (
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
                        </span>{' '}
                        {hasActiveMembership(user) ? (
                          <CheckIcon
                            className='flex-shrink-0 inline-block h-5 w-5 text-green-400 group-hover:text-gray-500'
                            aria-hidden='true'
                          />
                        ) : (
                          <XIcon
                            className='flex-shrink-0 inline-block h-5 w-5 text-red-400 group-hover:text-gray-500'
                            aria-hidden='true'
                          />
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
                      Name & Email
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Age
                    </th>
                    <th className='hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block'>
                      City
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Membership
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {users.map((user) => (
                    <tr key={user.id} className='bg-white'>
                      <td className='max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        <div className='flex'>
                          <Link
                            to={`/admin/users/${user.id}`}
                            className='group inline-flex space-x-2 truncate text-sm'
                          >
                            <UserIcon
                              className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                              aria-hidden='true'
                            />
                            <p className='text-gray-500 truncate group-hover:text-gray-900'>
                              {user.first_name} {user.last_name} ({user.email})
                            </p>
                          </Link>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {calcAge(user)}
                      </td>
                      <td className='hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block'>
                        {user.city}
                      </td>
                      <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                        {hasActiveMembership(user) ? (
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

export default Users;

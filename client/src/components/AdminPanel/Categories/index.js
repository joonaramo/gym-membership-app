import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ViewListIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCategories, getCategories } from '../../../actions/category';
import CreateCategory from './CreateCategory';
import Pagination from '../UI/Pagination';

const Categories = ({ setCurrent }) => {
  const [creating, setCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const {
    categories,
    allCategories,
    totalDocs,
    limit,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
  } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrent('Categories');
    dispatch(getCategories(currentPage, currentLimit));
  }, [currentPage, currentLimit]);

  if (creating) {
    return (
      <CreateCategory allCategories={allCategories} setCreating={setCreating} />
    );
  }
  return (
    <>
      <div className='flex-1 flex justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-lg leading-6 font-medium text-gray-900'>
          Categories
        </h2>
        <button
          onClick={() => {
            dispatch(getAllCategories());
            setCreating(true);
          }}
          className='inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
        >
          New category
        </button>
      </div>
      {/* Activity list (smallest breakpoint only) */}
      <div className='shadow sm:hidden'>
        <ul className='mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden'>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/admin/categories/${category.id}`}
                className='block px-4 py-4 bg-white hover:bg-gray-50'
              >
                <span className='flex items-center space-x-4'>
                  <span className='flex-1 flex space-x-2 truncate'>
                    <ViewListIcon
                      className='flex-shrink-0 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='flex flex-col text-gray-500 text-sm truncate'>
                      <span className='truncate'>
                        <span className='text-gray-900 font-medium'>
                          Category
                        </span>{' '}
                        {category.name}
                      </span>
                      <span>
                        <span className='text-gray-900 font-medium'>
                          Description
                        </span>{' '}
                        {category.description}
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
                      Name
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Description
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Parent Category
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {categories.map((category) => (
                    <tr key={category.id} className='bg-white'>
                      <td className='max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        <div className='flex'>
                          <Link
                            to={`/admin/categories/${category.id}`}
                            className='group inline-flex space-x-2 truncate text-sm'
                          >
                            <ViewListIcon
                              className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                              aria-hidden='true'
                            />
                            <p className='text-gray-500 truncate group-hover:text-gray-900'>
                              {category.name}
                            </p>
                          </Link>
                        </div>
                      </td>
                      <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                        {category.description}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {category.parent_category ? 'No' : 'Yes'}
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

export default Categories;

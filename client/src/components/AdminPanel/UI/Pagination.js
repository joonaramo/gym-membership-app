import React from 'react'

const Pagination = ({
  pagingCounter,
  limit,
  totalDocs,
  hasPrevPage,
  hasNextPage,
  setCurrentPage,
}) => {
  return (
    <nav
      className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'
      aria-label='Pagination'
    >
      <div className='hidden sm:block'>
        <p className='text-sm text-gray-700'>
          Showing <span className='font-medium'>{pagingCounter}</span> to{' '}
          <span className='font-medium'>
            {pagingCounter + limit - 1 > totalDocs
              ? totalDocs
              : pagingCounter + limit - 1}
          </span>{' '}
          of <span className='font-medium'>{totalDocs}</span> results
        </p>
      </div>
      <div className='flex-1 flex justify-between sm:justify-end'>
        {hasPrevPage && (
          <button
            onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
            className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          >
            Previous
          </button>
        )}
        {hasNextPage && (
          <button
            onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          >
            Next
          </button>
        )}
      </div>
    </nav>
  )
}

export default Pagination

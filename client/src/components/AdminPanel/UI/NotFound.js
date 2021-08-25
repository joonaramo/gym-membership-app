import React from 'react'
import { useHistory } from 'react-router'

const NotFound = () => {
  const history = useHistory()
  return (
    <div className='max-w-max mx-auto'>
      <main className='sm:flex'>
        <p className='text-4xl font-extrabold text-indigo-600 sm:text-5xl'>
          404
        </p>
        <div className='sm:ml-6'>
          <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
            <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
              Not found
            </h1>
            <p className='mt-1 text-base text-gray-500'>
              The resource you were looking for is missing.
            </p>
          </div>
          <div className='mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
            <button
              onClick={() => history.goBack()}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Go back
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFound

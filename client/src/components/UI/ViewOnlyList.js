import React from 'react'
import { Link } from 'react-router-dom'

const ViewOnlyList = ({ title, listItems, itemIcon, path }) => {
  return (
    <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8'>
      <dt className='text-sm font-medium text-gray-500'>{title}</dt>
      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
        {listItems.length > 0 ? (
          <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
            {listItems.map((item) => (
              <li
                key={item.id}
                className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
              >
                <Link
                  to={`${path}/${item.id}`}
                  className='w-0 flex-1 flex items-center'
                >
                  {itemIcon}
                  <span className='ml-2 flex-1 w-0 truncate'>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found.</p>
        )}
      </dd>
    </div>
  )
}

export default ViewOnlyList

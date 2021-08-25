import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ card }) => {
  return (
    <div className='bg-white overflow-hidden shadow rounded-lg'>
      <div className='p-5'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <card.icon className='h-6 w-6 text-gray-400' aria-hidden='true' />
          </div>
          <div className='ml-5 w-0 flex-1'>
            <dl>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                {card.name}
              </dt>
              <dd>
                <div className='text-lg font-medium text-gray-900'>
                  {card.amount}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className='bg-gray-50 px-5 py-3'>
        <div className='text-sm'>
          <Link
            to={card.href}
            className='font-medium text-cyan-700 hover:text-cyan-900'
          >
            View all
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card

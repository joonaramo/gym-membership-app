import React, { useState, useEffect } from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import { connect } from 'react-redux'
import { formatDistance } from 'date-fns'
import ListItem from './ListItem'
import { classNames } from '../../utils/helpers'
import { loadUser, updateUser } from '../../actions/auth'
import DateListItem from './DateListItem'
import Notification from './Notification'
import Alert from '../Auth/Alert'
import Loading from '../UI/Loading'

const Profile = ({ auth: { user, loading }, loadUser, updateUser }) => {
  const [updatedObject, setUpdatedObject] = useState()
  const [hasUnSavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  useEffect(() => {
    if (user) {
      setUpdatedObject({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        street_address: user.street_address,
        postal_code: user.postal_code,
        city: user.city,
        birth_date: user.birth_date,
      })
    }
  }, [user])

  const save = async () => {
    try {
      await updateUser(updatedObject)
      setHasUnsavedChanges(false)
    } catch (err) {
      console.log(err)
    }
  }

  if (loading || !updatedObject) {
    return <Loading color='auto' />
  }

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6 lg:px-8'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Your Profile
        </h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          Personal details and membership information
        </p>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
        <dl className='sm:divide-y sm:divide-gray-200'>
          <ListItem
            title='First name'
            name='first_name'
            value={updatedObject.first_name}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Last name'
            name='last_name'
            value={updatedObject.last_name}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Email address'
            name='email'
            value={updatedObject.email}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Phone number'
            name='phone_number'
            value={updatedObject.phone_number}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Street address'
            name='street_address'
            value={updatedObject.street_address}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Postal code'
            name='postal_code'
            value={updatedObject.postal_code}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='City'
            name='city'
            value={updatedObject.city}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <DateListItem
            title='Birth date'
            name='birth_date'
            nextMonthButtonLabel='>'
            previousMonthButtonLabel='<'
            dateFormat='dd/MM/yyyy'
            value={
              updatedObject.birth_date
                ? new Date(updatedObject.birth_date)
                : new Date(user.birth_date)
            }
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8'>
            <dt className='text-sm font-medium text-gray-500'>Memberships</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {user.memberships.length > 0 ? (
                <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                  {user.memberships
                    .filter(
                      (membership) => new Date(membership.end_date) > Date.now()
                    )
                    .map((membership) => (
                      <li
                        key={membership.id}
                        className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
                      >
                        <div className='w-0 flex-1 flex items-center'>
                          <CheckIcon
                            className='flex-shrink-0 h-5 w-5 text-green-500'
                            aria-hidden='true'
                          />
                          <span className='ml-2 flex-1 w-0 truncate'>
                            Active Membership (
                            {formatDistance(
                              new Date(membership.end_date),
                              Date.now()
                            )}{' '}
                            left)
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p>No active memberships</p>
              )}
            </dd>
          </div>
          <div className='py-4 sm:pt-5 pb-20 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8'>
            <dt className='text-sm font-medium text-gray-500'>Orders</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {user.orders.length > 0 ? (
                <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                  {user.orders.map((order) => (
                    <li
                      key={order.id}
                      className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
                    >
                      <div className='w-0 flex-1 flex items-center'>
                        <CheckIcon
                          className={classNames(
                            order.status === 'checkout_complete'
                              ? 'text-green-500'
                              : 'text-yellow-500',
                            'flex-shrink-0 h-5 w-5'
                          )}
                          aria-hidden='true'
                        />
                        <span className='ml-2 flex-1 w-0 truncate'>
                          Order ID: {order.id}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders made yet</p>
              )}
            </dd>
          </div>
          {hasUnSavedChanges && <Notification save={save} />}
          <Alert />
        </dl>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { loadUser, updateUser })(Profile)

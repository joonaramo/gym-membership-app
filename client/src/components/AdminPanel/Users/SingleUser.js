import React, { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistance } from 'date-fns';
import { classNames } from '../../../utils/helpers';
import { updateUser } from '../../../actions/user';
import ListItem from '../../Profile/ListItem';
import DateListItem from '../../Profile/DateListItem';
import Notification from '../../Profile/Notification';
import Alert from '../../Auth/Alert';
import { getUser } from '../../../actions/user';
import { useParams } from 'react-router';

const SingleUser = ({ setCurrent }) => {
  const [updatedUser, setUpdatedUser] = useState({
    id: undefined,
    email: undefined,
    first_name: undefined,
    last_name: undefined,
    phone_number: undefined,
    street_address: undefined,
    postal_code: undefined,
    city: undefined,
    birth_date: undefined,
  });
  const [hasUnSavedChanges, setHasUnsavedChanges] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
    setCurrent('Users');
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        street_address: user.street_address,
        postal_code: user.postal_code,
        city: user.city,
        birth_date: user.birth_date,
      });
    }
  }, [user]);

  const save = async () => {
    try {
      dispatch(updateUser(updatedUser));
      setHasUnsavedChanges(false);
    } catch (err) {
      console.log(err);
    }
  };
  if (!user.id) {
    return null;
  }
  return (
    <>
      <h2 className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        Edit user
      </h2>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0 mt-2'>
        <dl className='sm:divide-y sm:divide-gray-200'>
          <ListItem
            title='First name'
            name='first_name'
            value={`${
              updatedUser.first_name ? updatedUser.first_name : user.first_name
            }`}
            updatedUser={updatedUser}
            setUpdatedUser={setUpdatedUser}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Last name'
            name='last_name'
            value={`${
              updatedUser.last_name ? updatedUser.last_name : user.last_name
            }`}
            updatedUser={updatedUser}
            setUpdatedUser={setUpdatedUser}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Email address'
            name='email'
            value={`${updatedUser.email ? updatedUser.email : user.email}`}
            updatedUser={updatedUser}
            setUpdatedUser={setUpdatedUser}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Phone number'
            name='phone_number'
            value={`${
              updatedUser.phone_number
                ? updatedUser.phone_number
                : user.phone_number
            }`}
            updatedUser={updatedUser}
            setUpdatedUser={setUpdatedUser}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Street address'
            name='street_address'
            value={`${
              updatedUser.street_address
                ? updatedUser.street_address
                : user.street_address
            }`}
            updatedUser={updatedUser}
            setUpdatedUser={setUpdatedUser}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Postal code'
            name='postal_code'
            value={`${
              updatedUser.postal_code
                ? updatedUser.postal_code
                : user.postal_code
            }`}
            updatedUser={updatedUser}
            setUpdatedUser={setUpdatedUser}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='City'
            name='city'
            value={`${updatedUser.city ? updatedUser.city : user.city}`}
            updatedUser={updatedUser}
            setUpdatedUser={setUpdatedUser}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <DateListItem
            title='Birth date'
            name='birth_date'
            nextMonthButtonLabel='>'
            previousMonthButtonLabel='<'
            dateFormat='dd/MM/yyyy'
            value={
              updatedUser.birth_date
                ? new Date(updatedUser.birth_date)
                : new Date(user.birth_date)
            }
            updatedUser={updatedUser}
            setUpdatedUser={setUpdatedUser}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8'>
            <dt className='text-sm font-medium text-gray-500'>Memberships</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {user.memberships?.length > 0 ? (
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
                        {/* <div className='ml-4 flex-shrink-0'>
                        <a
                          href='#'
                          className='font-medium text-indigo-600 hover:text-indigo-500'
                        >
                          Download
                        </a>
                      </div> */}
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
              {user.orders?.length > 0 ? (
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
                      {/* <div className='ml-4 flex-shrink-0'>
                      <a
                        href='#'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        Download
                      </a>
                    </div> */}
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
    </>
  );
};

export default SingleUser;

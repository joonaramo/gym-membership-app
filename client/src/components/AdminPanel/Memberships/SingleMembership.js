import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import {
  getMembership,
  removeMembership,
  updateMembership,
} from '../../../actions/membership'
import ListItem from '../../Profile/ListItem'
import Notification from '../../Profile/Notification'
import DateListItem from '../../Profile/DateListItem'
import Loading from '../../UI/Loading'
import NotFound from '../UI/NotFound'

const SingleMembership = ({ setCurrent }) => {
  const [updatedObject, setUpdatedObject] = useState()
  const [hasUnSavedChanges, setHasUnsavedChanges] = useState(false)
  const { membership } = useSelector((state) => state.membership)
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getMembership(id))
    setCurrent('Memberships')
  }, [dispatch, id])

  useEffect(() => {
    if (membership) {
      setUpdatedObject({
        id: membership.id,
        start_date: membership.start_date,
        end_date: membership.end_date,
      })
    }
  }, [membership])

  const save = () => {
    dispatch(updateMembership(id, updatedObject))
    setHasUnsavedChanges(false)
  }

  const remove = () => {
    if (window.confirm('Are you sure you want to remove this membership?')) {
      dispatch(removeMembership(id))
      history.push('/admin/memberships')
    }
  }

  if (membership.failed) {
    return <NotFound />
  }

  if (membership.loading || !updatedObject) {
    return <Loading color='auto' />
  }

  return (
    <>
      <h2 className='max-w-6xl mx-auto px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        Edit a membership
      </h2>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0 mt-2'>
        <dl className='sm:divide-y sm:divide-gray-200 mb-10'>
          <ListItem
            title='User'
            name='user'
            type='text'
            value={`${membership.user?.first_name} ${membership.user?.last_name}`}
            editable={false}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Order ID'
            name='order'
            type='text'
            value={
              <Link
                to={`/admin/orders/${membership.order}`}
                className='text-cyan-600 hover:text-cyan-500'
              >
                {membership.order}
              </Link>
            }
            editable={false}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <DateListItem
            title='Start date'
            name='start_date'
            nextMonthButtonLabel='>'
            previousMonthButtonLabel='<'
            dateFormat='dd/MM/yyyy HH:mm'
            value={
              updatedObject.start_date
                ? new Date(updatedObject.start_date)
                : null
            }
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <DateListItem
            title='End date'
            name='end_date'
            nextMonthButtonLabel='>'
            previousMonthButtonLabel='<'
            dateFormat='dd/MM/yyyy HH:mm'
            value={
              updatedObject.end_date ? new Date(updatedObject.end_date) : null
            }
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <div className='py-4 sm:py-5 m:px-6 lg:px-8'>
            <button
              onClick={() => remove()}
              className='inline-flex items-center text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
            >
              Remove membership
            </button>
          </div>
        </dl>
        {hasUnSavedChanges && <Notification save={save} />}
      </div>
    </>
  )
}

export default SingleMembership

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { getCoupon, removeCoupon, updateCoupon } from '../../../actions/coupon'
import { getOrders } from '../../../actions/order'
import ListItem from '../../Profile/ListItem'
import Notification from '../../Profile/Notification'
import Toggle from './Toggle'
import Loading from '../../UI/Loading'
import NotFound from '../UI/NotFound'

const SingleCoupon = ({ setCurrent }) => {
  const [updatedObject, setUpdatedObject] = useState()
  const [hasUnSavedChanges, setHasUnsavedChanges] = useState(false)
  const { coupon } = useSelector((state) => state.coupon)
  const { orders } = useSelector((state) => state.order)
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getCoupon(id))
    dispatch(getOrders())
    setCurrent('Coupons')
  }, [dispatch, id])

  useEffect(() => {
    if (coupon) {
      setUpdatedObject({
        id: coupon.id,
        code: coupon.code,
        value: coupon.value,
        active: coupon.active,
      })
    }
  }, [coupon])

  const getOrdersWithKlarnaId = (order_ids) => {
    return orders.filter(
      (order) => order_ids && order_ids.includes(order.order_id)
    )
  }

  const toggle = () => {
    setUpdatedObject({
      ...updatedObject,
      active: !updatedObject.active,
    })
    if (updatedObject.active === coupon.active) {
      setHasUnsavedChanges(true)
    } else {
      setHasUnsavedChanges(false)
    }
  }

  const save = () => {
    dispatch(updateCoupon(id, updatedObject))
    setHasUnsavedChanges(false)
  }

  const remove = () => {
    if (window.confirm('Are you sure you want to remove this coupon?')) {
      dispatch(removeCoupon(id))
      history.push('/admin/coupons')
    }
  }

  if (coupon.failed) {
    return <NotFound />
  }

  if (coupon.loading || !updatedObject) {
    return <Loading color='auto' />
  }

  return (
    <>
      <h2 className='max-w-6xl mx-auto px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        Edit a coupon
      </h2>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0 mt-2'>
        <dl className='sm:divide-y sm:divide-gray-200 mb-10'>
          <ListItem
            title='Coupon code'
            name='code'
            type='text'
            value={updatedObject.code}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Value'
            name='value'
            type='number'
            value={updatedObject.value}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8'>
            <dt className='text-sm font-medium text-gray-500'>Orders</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {getOrdersWithKlarnaId(coupon?.orders).length > 0 ? (
                <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                  {getOrdersWithKlarnaId(coupon?.orders).map((order) => (
                    <li
                      key={order.id}
                      className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
                    >
                      <div className='w-0 flex-1 flex items-center'>
                        <Link
                          className='text-cyan-600 hover:text-cyan-500'
                          to={`/admin/orders/${order.id}`}
                        >
                          <span className='ml-2 flex-1 w-0 truncate'>
                            {order.id}
                          </span>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders with this coupon</p>
              )}
            </dd>
          </div>
          <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8'>
            <Toggle
              title='Active'
              enabled={updatedObject.active}
              handleChange={toggle}
            />
          </div>
          <div className='py-4 sm:py-5 m:px-6 lg:px-8'>
            <button
              onClick={() => remove()}
              className='inline-flex items-center text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
            >
              Remove coupon
            </button>
          </div>
        </dl>
        {hasUnSavedChanges && <Notification save={save} />}
      </div>
    </>
  )
}

export default SingleCoupon

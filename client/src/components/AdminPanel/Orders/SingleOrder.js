import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getOrder, removeOrder } from '../../../actions/order';
import ListItem from '../../Profile/ListItem';
import DateListItem from '../../Profile/DateListItem';

const SingleOrder = ({ setCurrent }) => {
  const [updatedObject, setUpdatedObject] = useState();
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrder(id));
    setCurrent('Orders');
  }, [dispatch, id]);

  useEffect(() => {
    if (order) {
      setUpdatedObject({
        id: order.id,
        order_id: order.order_id,
        status: order.status,
        order_amount: order.order_amount,
        order_tax_amount: order.order_tax_amount,
        started_at: order.started_at,
        completed_at: order.completed_at,
      });
    }
  }, [order]);

  const remove = () => {
    dispatch(removeOrder(id));
    history.push('/admin/products');
  };

  if (!updatedObject) {
    return null;
  }

  return (
    <>
      <div className='flex mx-auto mt-8'>
        <h2 className='flex-1 px-4 sm:px-6 lg:px-8 text-lg leading-6 font-medium text-gray-900'>
          Order details
        </h2>
        <h2 className='flex-1 px-4 sm:px-6 lg:px-8 text-lg leading-6 font-medium text-gray-900'>
          Products
        </h2>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0 mt-2'>
        <div className='flex'>
          <dl className='flex-1 sm:divide-y sm:divide-gray-200'>
            <ListItem
              title='Internal order ID'
              name='id'
              type='text'
              editable={false}
              value={updatedObject.id}
              updatedObject={updatedObject}
              setUpdatedObject={setUpdatedObject}
            />
            <ListItem
              title='Klarna order ID'
              name='order_id'
              type='text'
              editable={false}
              value={updatedObject.order_id}
              updatedObject={updatedObject}
              setUpdatedObject={setUpdatedObject}
            />
            <ListItem
              title='User'
              name='user'
              type='text'
              editable={false}
              value={`${order.user?.first_name} ${order.user?.last_name}`}
              updatedObject={updatedObject}
              setUpdatedObject={setUpdatedObject}
            />
            <ListItem
              title='Status'
              name='staus'
              type='text'
              editable={false}
              value={updatedObject.status}
              updatedObject={updatedObject}
              setUpdatedObject={setUpdatedObject}
            />
            <ListItem
              title='Amount (€)'
              name='order_amount'
              type='number'
              editable={false}
              value={updatedObject.order_amount}
              updatedObject={updatedObject}
              setUpdatedObject={setUpdatedObject}
            />
            <ListItem
              title='Tax amount (€)'
              name='order_tax_amount'
              type='number'
              editable={false}
              value={updatedObject.order_tax_amount}
              updatedObject={updatedObject}
              setUpdatedObject={setUpdatedObject}
            />
            <DateListItem
              title='Order started date'
              name='started_at'
              editable={false}
              nextMonthButtonLabel='>'
              previousMonthButtonLabel='<'
              dateFormat='dd/MM/yyyy HH:mm'
              value={
                updatedObject.started_at
                  ? new Date(updatedObject.started_at)
                  : null
              }
              updatedObject={updatedObject}
              setUpdatedObject={setUpdatedObject}
            />
            <DateListItem
              title='Order completed date'
              name='completed_at'
              editable={false}
              nextMonthButtonLabel='>'
              previousMonthButtonLabel='<'
              dateFormat='dd/MM/yyyy HH:mm'
              value={
                updatedObject.completed_at
                  ? new Date(updatedObject.completed_at)
                  : null
              }
              updatedObject={updatedObject}
              setUpdatedObject={setUpdatedObject}
            />
            <div className='py-4 sm:py-5 m:px-6 lg:px-8'>
              <button
                onClick={() => remove()}
                className='inline-flex items-center text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
              >
                Remove order
              </button>
            </div>
          </dl>
          <dl className='flex-1 sm:divide-y sm:divide-gray-200'>
            {order.products?.map((product) => (
              <ListItem
                title='Product'
                name='id'
                type='text'
                editable={false}
                value={
                  <Link
                    className='text-cyan-600 hover:text-cyan-500'
                    to={`/admin/products/${product.id}`}
                  >
                    {product.name}
                  </Link>
                }
                updatedObject={updatedObject}
                setUpdatedObject={setUpdatedObject}
              />
            ))}
          </dl>
        </div>
      </div>
    </>
  );
};

export default SingleOrder;

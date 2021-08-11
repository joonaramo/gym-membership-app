import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getOrder, removeOrder } from '../../../actions/order';
import klarnaService from '../../../services/klarna';
import ListItem from '../../Profile/ListItem';
import DateListItem from '../../Profile/DateListItem';
import { setNotification } from '../../../actions/notification';

const SingleOrder = ({ setCurrent }) => {
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrder(id));
    setCurrent('Orders');
  }, [dispatch, id]);

  const remove = () => {
    dispatch(removeOrder(id));
    history.push('/admin/orders');
  };

  const capture = async () => {
    const captureData = {
      order_amount: order.klarna.order_amount,
      order_lines: order.klarna.order_lines,
    };
    try {
      const { message } = await klarnaService.capture(
        order.klarna.order_id,
        captureData
      );
      dispatch(setNotification(message, 'SUCCESS', 3000));
      dispatch(getOrder(id));
    } catch (err) {
      dispatch(setNotification('Order capture failed', 3000));
    }
  };

  if (!order) {
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
              value={order.id}
            />
            <ListItem
              title='User'
              name='user'
              type='text'
              editable={false}
              value={
                <Link
                  to={`/admin/users/${order.user?._id}`}
                  className='text-cyan-600 hover:text-cyan-500'
                >
                  {order.user?.first_name} {order.user?.last_name}
                </Link>
              }
            />
            <ListItem
              title='Status'
              name='staus'
              type='text'
              editable={false}
              value={order.status}
            />
            <ListItem
              title='Amount (€)'
              name='order_amount'
              type='number'
              editable={false}
              value={order.order_amount}
            />
            <ListItem
              title='Tax amount (€)'
              name='order_tax_amount'
              type='number'
              editable={false}
              value={order.order_tax_amount}
            />
            <DateListItem
              title='Order started'
              name='started_at'
              editable={false}
              nextMonthButtonLabel='>'
              previousMonthButtonLabel='<'
              dateFormat='dd/MM/yyyy HH:mm'
              value={order.started_at ? new Date(order.started_at) : null}
            />
            <DateListItem
              title='Order completed'
              name='completed_at'
              editable={false}
              nextMonthButtonLabel='>'
              previousMonthButtonLabel='<'
              dateFormat='dd/MM/yyyy HH:mm'
              value={order.completed_at ? new Date(order.completed_at) : null}
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
                key={product._id}
                title='Product'
                name='id'
                type='text'
                editable={false}
                value={
                  <Link
                    className='text-cyan-600 hover:text-cyan-500'
                    to={`/admin/products/${product._id}`}
                  >
                    {product.name}
                  </Link>
                }
              />
            ))}
            {order.klarna && (
              <div className='flex-1 sm:divide-y sm:divide-gray-200'>
                <h2 className='mt-8 mb-1 px-4 sm:px-6 lg:px-8 text-lg leading-6 font-medium text-gray-900'>
                  Klarna
                </h2>
                <ListItem
                  title='Order ID'
                  name='order_id'
                  type='text'
                  editable={false}
                  value={order.klarna.order_id}
                />
                <ListItem
                  title='Status'
                  name='status'
                  type='text'
                  editable={false}
                  value={order.klarna.status}
                />
                <ListItem
                  title='Payment method'
                  name='payment_method'
                  type='text'
                  editable={false}
                  value={order.klarna.initial_payment_method.description}
                />
                <ListItem
                  title='Purchase country'
                  name='purchase_country'
                  type='text'
                  editable={false}
                  value={order.klarna.purchase_country}
                />
                {order.klarna.status === 'CAPTURED' ? (
                  <DateListItem
                    title='Funds captured'
                    name='captured_at'
                    editable={false}
                    nextMonthButtonLabel='>'
                    previousMonthButtonLabel='<'
                    dateFormat='dd/MM/yyyy HH:mm'
                    value={
                      order.klarna.captures[0].captured_at
                        ? new Date(order.klarna.captures[0].captured_at)
                        : null
                    }
                  />
                ) : (
                  <div className='py-4 sm:py-5 m:px-6 lg:px-8'>
                    <button
                      onClick={() => capture()}
                      className='inline-flex items-center text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                    >
                      Capture funds
                    </button>
                  </div>
                )}
              </div>
            )}
          </dl>
        </div>
      </div>
    </>
  );
};

export default SingleOrder;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, removeOrder, updateOrder } from '../../../actions/order';
import ListItem from '../../Profile/ListItem';
import Notification from '../../Profile/Notification';
import Alert from '../../Auth/Alert';
import { useHistory, useParams } from 'react-router';
import DateListItem from '../../Profile/DateListItem';

const SingleOrder = ({ setCurrent }) => {
  const [updatedObject, setUpdatedObject] = useState();
  const [hasUnSavedChanges, setHasUnsavedChanges] = useState(false);
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

  const save = () => {
    dispatch(updateOrder(id, updatedObject));
    setHasUnsavedChanges(false);
  };

  const remove = () => {
    dispatch(removeOrder(id));
    history.push('/admin/products');
  };

  if (!updatedObject) {
    return null;
  }

  return (
    <>
      <h2 className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        Edit an order
      </h2>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0 mt-2'>
        <dl className='sm:divide-y sm:divide-gray-200'>
          <ListItem
            title='Internal order ID'
            name='id'
            type='text'
            editable={false}
            value={updatedObject.id}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Klarna order ID'
            name='order_id'
            type='text'
            editable={false}
            value={updatedObject.order_id}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='User'
            name='user'
            type='text'
            editable={false}
            value={`${order.user?.first_name} ${order.user?.last_name}`}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Status'
            name='staus'
            type='text'
            editable={false}
            value={updatedObject.status}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Amount (€)'
            name='order_amount'
            type='number'
            editable={false}
            value={updatedObject.order_amount}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Tax amount (€)'
            name='order_tax_amount'
            type='number'
            editable={false}
            value={updatedObject.order_tax_amount}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
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
            setHasUnsavedChanges={setHasUnsavedChanges}
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
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <div className='py-4 sm:py-5 m:px-6 lg:px-8'>
            <button
              onClick={() => remove()}
              className='inline-flex items-center text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
            >
              Remove order
            </button>
          </div>
          {hasUnSavedChanges && <Notification save={save} />}
          <Alert />
        </dl>
      </div>
    </>
  );
};

export default SingleOrder;

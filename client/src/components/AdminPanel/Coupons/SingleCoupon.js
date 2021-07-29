import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getCoupon, removeCoupon, updateCoupon } from '../../../actions/coupon';
import ListItem from '../../Profile/ListItem';
import Notification from '../../Profile/Notification';
import Alert from '../../Auth/Alert';
import Toggle from './Toggle';

const SingleCoupon = ({ setCurrent }) => {
  const [updatedObject, setUpdatedObject] = useState();
  const [enabled, setEnabled] = useState(false);
  const [hasUnSavedChanges, setHasUnsavedChanges] = useState(false);
  const { coupon } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCoupon(id));
    setCurrent('Coupons');
  }, [dispatch, id]);

  useEffect(() => {
    if (coupon) {
      setUpdatedObject({
        id: coupon.id,
        code: coupon.code,
        value: coupon.value,
        active: coupon.active,
      });
    }
  }, [coupon]);

  const toggle = () => {
    setUpdatedObject({
      ...updatedObject,
      active: !updatedObject.active,
    });
    if (updatedObject.active === coupon.active) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  };

  const save = () => {
    dispatch(updateCoupon(id, updatedObject));
    setHasUnsavedChanges(false);
  };

  const remove = () => {
    dispatch(removeCoupon(id));
    history.push('/admin/coupons');
  };

  if (!updatedObject) {
    return null;
  }

  return (
    <>
      <h2 className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        Edit a coupon
      </h2>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0 mt-2'>
        <dl className='sm:divide-y sm:divide-gray-200'>
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
          {hasUnSavedChanges && <Notification save={save} />}
          <Alert />
        </dl>
      </div>
    </>
  );
};

export default SingleCoupon;

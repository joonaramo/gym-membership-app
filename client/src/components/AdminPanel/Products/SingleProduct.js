import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProduct,
  removeProduct,
  updateProduct,
} from '../../../actions/product';
import ListItem from '../../Profile/ListItem';
import Notification from '../../Profile/Notification';
import { useHistory, useParams } from 'react-router';

const SingleProduct = ({ setCurrent }) => {
  const [updatedObject, setUpdatedObject] = useState();
  const [hasUnSavedChanges, setHasUnsavedChanges] = useState(false);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProduct(id));
    setCurrent('Products');
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setUpdatedObject({
        id: product.id,
        type: product.type,
        quantity_unit: product.quantity_unit,
        times_purchased: product.times_purchased,
        reference: product.reference,
        name: product.name,
        unit_price: product.unit_price,
        tax_rate: product.tax_rate,
        membership_length: product.membership_length,
      });
    }
  }, [product]);

  const save = () => {
    dispatch(updateProduct(id, updatedObject));
    setHasUnsavedChanges(false);
  };

  const remove = () => {
    dispatch(removeProduct(id));
    history.push('/admin/products');
  };

  if (!updatedObject) {
    return null;
  }

  return (
    <>
      <h2 className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        Edit a product
      </h2>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0 mt-2'>
        <dl className='sm:divide-y sm:divide-gray-200 mb-10'>
          <ListItem
            title='Name'
            name='name'
            type='text'
            value={updatedObject.name}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Reference'
            name='reference'
            type='text'
            value={updatedObject.reference}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Type'
            name='type'
            type='text'
            value={updatedObject.type}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Price (€)'
            name='unit_price'
            type='number'
            value={updatedObject.unit_price}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Tax rate (%)'
            name='tax_rate'
            type='number'
            value={updatedObject.tax_rate}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Quantity unit'
            name='quantity_unit'
            type='text'
            value={updatedObject.quantity_unit}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Membership length (months)'
            name='membership_length'
            type='number'
            value={updatedObject.membership_length}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Times purchased'
            name='times_purchased'
            type='number'
            value={updatedObject.times_purchased}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <div className='py-4 sm:py-5 m:px-6 lg:px-8'>
            <button
              onClick={() => remove()}
              className='inline-flex items-center text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
            >
              Remove product
            </button>
          </div>
        </dl>
        {hasUnSavedChanges && <Notification save={save} />}
      </div>
    </>
  );
};

export default SingleProduct;

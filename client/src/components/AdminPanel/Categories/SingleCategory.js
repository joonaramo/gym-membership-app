import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
  getAllCategories,
  getCategory,
  removeCategory,
  updateCategory,
} from '../../../actions/category';
import ListItem from '../../Profile/ListItem';
import Notification from '../../Profile/Notification';
import Loading from '../../UI/Loading';
import NotFound from '../UI/NotFound';
import SelectListItem from '../../UI/SelectListItem';
import { ShoppingCartIcon, ViewListIcon } from '@heroicons/react/outline';
import ViewOnlyList from '../../UI/ViewOnlyList';

const SingleCategory = ({ setCurrent }) => {
  const [updatedObject, setUpdatedObject] = useState();
  const [hasUnSavedChanges, setHasUnsavedChanges] = useState(false);
  const { category, allCategories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCategory(id));
    dispatch(getAllCategories());
    setCurrent('Categories');
  }, [dispatch, id]);

  useEffect(() => {
    if (category) {
      setUpdatedObject({
        id: category.id,
        name: category.name,
        description: category.description,
      });
    }
  }, [category]);

  const save = () => {
    dispatch(updateCategory(id, updatedObject));
    setHasUnsavedChanges(false);
  };

  const remove = () => {
    if (window.confirm('Are you sure you want to remove this category?')) {
      dispatch(removeCategory(id));
      history.push('/admin/categories');
    }
  };

  if (category.failed) {
    return <NotFound />;
  }

  if (category.loading || !updatedObject) {
    return <Loading color='auto' />;
  }

  return (
    <>
      <h2 className='max-w-6xl mx-auto px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        Edit a category
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
            title='Description'
            name='description'
            type='text'
            value={updatedObject.description}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <SelectListItem
            title='Parent category'
            name='parent_category'
            value={category.parent_category || ''}
            listItems={allCategories}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ViewOnlyList
            title='Sub categories'
            listItems={category.sub_categories}
            itemIcon={
              <ViewListIcon
                className='flex-shrink-0 h-5 w-5'
                aria-hidden='true'
              />
            }
            path='/admin/categories'
          />
          <ViewOnlyList
            title='Products'
            listItems={category.products}
            itemIcon={
              <ShoppingCartIcon
                className='flex-shrink-0 h-5 w-5'
                aria-hidden='true'
              />
            }
            path='/admin/products'
          />
          <div className='py-4 sm:py-5 m:px-6 lg:px-8'>
            <button
              onClick={() => remove()}
              className='inline-flex items-center text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
            >
              Remove category
            </button>
          </div>
        </dl>
        {hasUnSavedChanges && <Notification save={save} />}
      </div>
    </>
  );
};

export default SingleCategory;

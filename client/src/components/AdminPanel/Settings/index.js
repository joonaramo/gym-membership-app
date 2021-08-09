import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
  getSettings,
  removeSettings,
  updateSettings,
} from '../../../actions/settings';
import ListItem from '../../Profile/ListItem';
import Notification from '../../Profile/Notification';
import Alert from '../../Auth/Alert';
import CreateSettings from './CreateSettings';
// import Toggle from './Toggle';

const Settings = ({ setCurrent }) => {
  const [updatedObject, setUpdatedObject] = useState();
  const [hasUnSavedChanges, setHasUnsavedChanges] = useState(false);
  const { settings, loading } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSettings());
    setCurrent('Settings');
  }, [dispatch, id]);

  useEffect(() => {
    if (settings) {
      setUpdatedObject({
        business_name: settings.business_name,
        logo_url: settings.logo_url,
        alt_logo_url: settings.alt_logo_url,
        welcome_email: settings.welcome_email.message,
        order_email: settings.order_email.message,
        maps: settings.maps,
        social_urls: settings.social_urls,
      });
    }
  }, [settings]);

  // const toggle = () => {
  //   setUpdatedObject({
  //     ...updatedObject,
  //     active: !updatedObject.active,
  //   });
  //   if (updatedObject.active === coupon.active) {
  //     setHasUnsavedChanges(true);
  //   } else {
  //     setHasUnsavedChanges(false);
  //   }
  // };

  const save = () => {
    dispatch(updateSettings(updatedObject));
    setHasUnsavedChanges(false);
  };

  const remove = () => {
    dispatch(removeSettings());
    history.push('/admin');
  };

  if (!updatedObject) {
    return <CreateSettings />;
  }

  return (
    <>
      <h2 className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        Edit settings
      </h2>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0 mt-2'>
        <dl className='sm:divide-y sm:divide-gray-200 mb-10'>
          <ListItem
            title='Business name'
            name='business_name'
            type='text'
            value={updatedObject.business_name}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Logo URL'
            name='logo_url'
            type='text'
            value={updatedObject.logo_url}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Alt Logo URL'
            name='alt_logo_url'
            type='text'
            value={updatedObject.alt_logo_url}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Welcome email message'
            name='welcome_email'
            type='text'
            value={updatedObject.welcome_email}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title='Order email message'
            name='order_email'
            type='text'
            value={updatedObject.order_email}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          {/* <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8'>
            <Toggle
              title='Active'
              enabled={updatedObject.active}
              handleChange={toggle}
            />
          </div> */}
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
        <Alert />
      </div>
    </>
  );
};

export default Settings;

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import {
  getSettings,
  removeSettings,
  updateSettings,
} from '../../../actions/settings'
import ListItem from '../../Profile/ListItem'
import Notification from '../../Profile/Notification'
import Alert from '../../Auth/Alert'
import CreateSettings from './CreateSettings'

const Settings = ({ setCurrent }) => {
  const [updatedObject, setUpdatedObject] = useState()
  const [hasUnSavedChanges, setHasUnsavedChanges] = useState(false)
  const { settings } = useSelector((state) => state.settings)
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getSettings())
    setCurrent('Settings')
  }, [dispatch, id])

  useEffect(() => {
    if (settings) {
      setUpdatedObject({
        business_name: settings.business_name,
        logo_url: settings.logo_url,
        alt_logo_url: settings.alt_logo_url,
        welcome_email: {
          message: settings.welcome_email.message,
          enabled: true,
        },
        order_email: { message: settings.order_email.message, enabled: true },
        maps: {
          api_key: settings.maps.api_key,
          lat: settings.maps.lat,
          lng: settings.maps.lng,
        },
        social_urls: {
          facebook: settings.social_urls.facebook,
          instagram: settings.social_urls.instagram,
          twitter: settings.social_urls.twitter,
        },
      })
    }
  }, [settings])

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
    dispatch(updateSettings(updatedObject))
    setHasUnsavedChanges(false)
  }

  const remove = () => {
    dispatch(removeSettings())
    history.push('/admin')
  }

  if (!updatedObject) {
    return <CreateSettings />
  }

  return (
    <>
      <h2 className="max-w-6xl mx-auto px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
        Edit settings
      </h2>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0 mt-2">
        <dl className="sm:divide-y sm:divide-gray-200 mb-10">
          <ListItem
            title="Business name"
            name="business_name"
            type="text"
            value={updatedObject.business_name}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title="Logo URL"
            name="logo_url"
            type="text"
            value={updatedObject.logo_url}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title="Alt Logo URL"
            name="alt_logo_url"
            type="text"
            value={updatedObject.alt_logo_url}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title="Welcome email message"
            name="welcome_email"
            type="text"
            value={updatedObject.welcome_email.message}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title="Order email message"
            name="order_email"
            type="text"
            value={updatedObject.order_email.message}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title="Google Maps API Key"
            name="maps_api_key"
            type="text"
            value={updatedObject.maps.api_key}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title="Google Maps Latitude"
            name="maps_lat"
            type="number"
            value={updatedObject.maps.lat}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title="Google Maps Longitude"
            name="maps_lng"
            type="number"
            value={updatedObject.maps.lng}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title="Facebook URL"
            name="facebook_url"
            type="text"
            value={updatedObject.social_urls.facebook}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title="Instagram URL"
            name="instagram_url"
            type="text"
            value={updatedObject.social_urls.instagram}
            updatedObject={updatedObject}
            setUpdatedObject={setUpdatedObject}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
          <ListItem
            title="Twitter URL"
            name="twitter_url"
            type="text"
            value={updatedObject.social_urls.twitter}
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
          <div className="py-4 sm:py-5 m:px-6 lg:px-8">
            <button
              onClick={() => remove()}
              className="inline-flex items-center text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Remove settings
            </button>
          </div>
        </dl>
        {hasUnSavedChanges && <Notification save={save} />}
        <Alert />
      </div>
    </>
  )
}

export default Settings

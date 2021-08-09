import React from 'react';
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { createSettings } from '../../../actions/settings';
import { useDispatch } from 'react-redux';

const initialValues = {
  business_name: '',
  logo_url: '',
  alt_logo_url: '',
  welcome_email: '',
  order_email: '',
  maps_api_key: '',
  maps_lat: '',
  maps_lng: '',
  facebook_url: '',
  instagram_url: '',
  twitter_url: '',
};

const CreateSettings = () => {
  const dispatch = useDispatch();
  const onSubmit = ({
    business_name,
    logo_url,
    alt_logo_url,
    welcome_email,
    order_email,
    maps_api_key,
    maps_lat,
    maps_lng,
    facebook_url,
    instagram_url,
    twitter_url,
  }) => {
    dispatch(
      createSettings({
        business_name,
        logo_url,
        alt_logo_url,
        welcome_email: { message: welcome_email, enabled: true },
        order_email: { message: order_email, enabled: true },
        maps: { api_key: maps_api_key, lat: maps_lat, lng: maps_lng },
        social_urls: {
          facebook: facebook_url,
          instagram: instagram_url,
          twitter: twitter_url,
        },
      })
    );
  };
  return (
    <>
      <div className='flex-1 flex justify-between max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8'>
        <h2 className='text-lg leading-6 font-medium text-gray-900'>
          Create settings
        </h2>
      </div>
      <div className='py-8 px-4 shadow sm:rounded-lg sm:px-10'>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          <Form className='space-y-6'>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='business_name'
              >
                Business name
              </label>
              <div className='mt-1'>
                <Field
                  id='business_name'
                  name='business_name'
                  type='text'
                  autoComplete='business_name'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='business_name' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='logo_url'
              >
                Logo URL
              </label>
              <div className='mt-1'>
                <Field
                  id='logo_url'
                  name='logo_url'
                  type='text'
                  autoComplete='logo_url'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='logo_url' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='alt_logo_url'
              >
                Alt Logo URL
              </label>
              <div className='mt-1'>
                <Field
                  id='alt_logo_url'
                  name='alt_logo_url'
                  type='text'
                  autoComplete='alt_logo_url'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='alt_logo_url' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='welcome_email'
              >
                Welcome email message
              </label>
              <div className='mt-1'>
                <Field
                  id='welcome_email'
                  name='welcome_email'
                  type='text'
                  autoComplete='welcome_email'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='welcome_email' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='order_email'
              >
                Order email message
              </label>
              <div className='mt-1'>
                <Field
                  id='order_email'
                  name='order_email'
                  type='text'
                  autoComplete='order_email'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='order_email' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='maps_api_key'
              >
                Google Maps API key
              </label>
              <div className='mt-1'>
                <Field
                  id='maps_api_key'
                  name='maps_api_key'
                  type='text'
                  autoComplete='maps_api_key'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='maps_api_key' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='maps_lat'
              >
                Maps latitude
              </label>
              <div className='mt-1'>
                <Field
                  id='maps_lat'
                  name='maps_lat'
                  type='number'
                  autoComplete='maps_lat'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='maps_lat' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='maps_lng'
              >
                Maps longitude
              </label>
              <div className='mt-1'>
                <Field
                  id='maps_lng'
                  name='maps_lng'
                  type='number'
                  autoComplete='maps_lng'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='maps_lng' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='facebook_url'
              >
                Facebook URL
              </label>
              <div className='mt-1'>
                <Field
                  id='facebook_url'
                  name='facebook_url'
                  type='text'
                  autoComplete='facebook_url'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='facebook_url' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='instagram_url'
              >
                Instagram URL
              </label>
              <div className='mt-1'>
                <Field
                  id='instagram_url'
                  name='instagram_url'
                  type='text'
                  autoComplete='instagram_url'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='instagram_url' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='twitter_url'
              >
                Twitter URL
              </label>
              <div className='mt-1'>
                <Field
                  id='twitter_url'
                  name='twitter_url'
                  type='text'
                  autoComplete='twitter_url'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='twitter_url' />
            </div>
            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
              >
                Create
              </button>
            </div>
          </Form>
        </Formik>
        {/* <Alert /> */}
      </div>
    </>
  );
};

export default CreateSettings;

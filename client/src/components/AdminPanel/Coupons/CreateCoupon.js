import React from 'react';
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { createCoupon } from '../../../actions/coupon';
import { useDispatch } from 'react-redux';

const initialValues = {
  code: '',
  value: 0,
  active: true,
};

const validationSchema = yup.object({
  code: yup.string().required('Code is required'),
  value: yup
    .number('Value must be a number')
    .typeError('Value must be a number')
    .required('Value is required'),
  active: yup
    .boolean('State must be a number')
    .typeError('State must be a number')
    .required('State is required'),
});

const CreateCoupon = ({ setCreating }) => {
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    dispatch(createCoupon(values, setCreating));
  };
  return (
    <>
      <div className='flex-1 flex justify-between max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8'>
        <h2 className='text-lg leading-6 font-medium text-gray-900'>
          Create a coupon
        </h2>
        <button
          onClick={() => setCreating(false)}
          className='inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
        >
          Cancel
        </button>
      </div>
      <div className='py-8 px-4 shadow sm:rounded-lg sm:px-10'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          <Form className='space-y-6'>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='code'
              >
                Code
              </label>
              <div className='mt-1'>
                <Field
                  id='code'
                  name='code'
                  type='text'
                  autoComplete='code'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='code' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='value'
              >
                Value
              </label>
              <div className='mt-1'>
                <Field
                  id='value'
                  name='value'
                  type='number'
                  autoComplete='value'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='value' />
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
      </div>
    </>
  );
};

export default CreateCoupon;

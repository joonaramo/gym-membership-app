import React from 'react';
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { createCategory } from '../../../actions/category';
import { useDispatch } from 'react-redux';

const initialValues = {
  name: '',
  description: '',
};

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
});

const CreateCategory = ({ setCreating, allCategories }) => {
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    dispatch(createCategory(values, setCreating));
  };
  return (
    <>
      <div className='flex-1 flex justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-lg leading-6 font-medium text-gray-900'>
          Create a category
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
                htmlFor='name'
              >
                Name
              </label>
              <div className='mt-1'>
                <Field
                  id='name'
                  name='name'
                  type='text'
                  autoComplete='name'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='name' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='description'
              >
                Description
              </label>
              <div className='mt-1'>
                <Field
                  id='description'
                  name='description'
                  type='text'
                  autoComplete='description'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='description' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='parent_category'
              >
                Parent category
              </label>
              <div className='mt-1'>
                <Field
                  as='select'
                  id='parent_category'
                  name='parent_category'
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                >
                  <option value=''>Select (optional)</option>
                  {allCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </div>
              <ErrorMessage name='parent_category' />
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

export default CreateCategory;

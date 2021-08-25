import React from 'react'
import * as yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { createProduct } from '../../../actions/product'
import { useDispatch } from 'react-redux'

const initialValues = {
  reference: '',
  name: '',
  membership_length: '',
  unit_price: '',
  tax_rate: '',
}

const validationSchema = yup.object({
  reference: yup.string().required('Reference is required'),
  name: yup.string().required('Name is required'),
  membership_length: yup
    .number('Membership length must be a number')
    .typeError('Membership length must be a number'),
  unit_price: yup
    .number('Price must be a number')
    .typeError('Price must be a number')
    .required('Price is required'),
  tax_rate: yup
    .number('Tax rate must be a number')
    .typeError('Tax rate must be a number')
    .required('Tax rate is required'),
})

const CreateProduct = ({ setCreating, allCategories }) => {
  const dispatch = useDispatch()
  const onSubmit = (values) => {
    dispatch(createProduct(values))
    setCreating(false)
  }
  return (
    <>
      <div className='flex-1 flex justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-lg leading-6 font-medium text-gray-900'>
          Create a product
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
            onSubmit(values)
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
                htmlFor='reference'
              >
                Reference
              </label>
              <div className='mt-1'>
                <Field
                  id='reference'
                  name='reference'
                  type='text'
                  autoComplete='reference'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='reference' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='category'
              >
                Category
              </label>
              <div className='mt-1'>
                <Field
                  as='select'
                  id='category'
                  name='category'
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
              <ErrorMessage name='category' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='membership_length'
              >
                Membership length
              </label>
              <div className='mt-1'>
                <Field
                  id='membership_length'
                  name='membership_length'
                  type='number'
                  autoComplete='membership_length'
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='membership_length' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='unit_price'
              >
                Price
              </label>
              <div className='mt-1'>
                <Field
                  id='unit_price'
                  name='unit_price'
                  type='number'
                  autoComplete='unit_price'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='unit_price' />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='tax_rate'
              >
                Tax rate
              </label>
              <div className='mt-1'>
                <Field
                  id='tax_rate'
                  name='tax_rate'
                  type='number'
                  autoComplete='tax_rate'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                />
              </div>
              <ErrorMessage name='tax_rate' />
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
  )
}

export default CreateProduct

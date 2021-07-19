import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { signup } from '../../actions/auth';
import { useHistory } from 'react-router';
import { format } from 'date-fns';
import DatePickerField from './DatePickerField';
import Alert from './Alert';

const initialValues = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  street_address: '',
  postal_code: null,
  city: '',
  birth_date: new Date(),
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  password2: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Please repeat password'),
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  birth_date: yup.date().required('Birth date is required'),
  phone_number: yup.string().required('Phone number is required'),
  street_address: yup.string().required('Street address is required'),
  city: yup.string().required('City is required'),
  postal_code: yup.string().required('Postal code is required'),
});

const SignUp = ({ auth: { isAuthenticated }, signup }) => {
  const history = useHistory();

  const onSubmit = async (values) => {
    const {
      email,
      password,
      first_name,
      last_name,
      phone_number,
      street_address,
      postal_code,
      city,
      birth_date,
    } = values;
    await signup({
      email,
      password,
      first_name,
      last_name,
      phone_number,
      street_address,
      postal_code,
      city,
      birth_date: format(birth_date, 'yyyy-MM-dd'),
      history,
    });
  };

  if (isAuthenticated) {
    history.push('/profile');
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          className='mx-auto h-12 w-auto'
          src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
          alt='Workflow'
        />
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Create a new account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Already have one?{' '}
          <Link
            to='/login'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Log in
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
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
                  htmlFor='first_name'
                >
                  First name
                </label>
                <div className='mt-1'>
                  <Field
                    id='first_name'
                    name='first_name'
                    type='text'
                    autoComplete='first_name'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                <ErrorMessage name='first_name' />
              </div>
              <div>
                <label
                  className='block text-sm font-medium text-gray-700'
                  htmlFor='last_name'
                >
                  Last name
                </label>
                <div className='mt-1'>
                  <Field
                    id='last_name'
                    name='last_name'
                    type='text'
                    autoComplete='last_name'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                <ErrorMessage name='last_name' />
              </div>
              <div>
                <label
                  className='block text-sm font-medium text-gray-700'
                  htmlFor='birth_date'
                >
                  Birth date
                </label>
                <div className='mt-1'>
                  <DatePickerField
                    id='birth_date'
                    name='birth_date'
                    nextMonthButtonLabel='>'
                    previousMonthButtonLabel='<'
                    dateFormat='dd/MM/yyyy'
                  />
                </div>
                <ErrorMessage name='birth_date' />
              </div>
              <div>
                <label
                  className='block text-sm font-medium text-gray-700'
                  htmlFor='phone_number'
                >
                  Phone number
                </label>
                <div className='mt-1'>
                  <Field
                    id='phone_number'
                    name='phone_number'
                    type='text'
                    autoComplete='phone_number'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                <ErrorMessage name='phone_number' />
              </div>
              <div>
                <label
                  className='block text-sm font-medium text-gray-700'
                  htmlFor='street_address'
                >
                  Street address
                </label>
                <div className='mt-1'>
                  <Field
                    id='street_address'
                    name='street_address'
                    type='text'
                    autoComplete='street_address'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                <ErrorMessage name='street_address' />
              </div>
              <div>
                <label
                  className='block text-sm font-medium text-gray-700'
                  htmlFor='city'
                >
                  City
                </label>
                <div className='mt-1'>
                  <Field
                    id='city'
                    name='city'
                    type='text'
                    autoComplete='city'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                <ErrorMessage name='city' />
              </div>
              <div>
                <label
                  className='block text-sm font-medium text-gray-700'
                  htmlFor='postal_code'
                >
                  Postal code
                </label>
                <div className='mt-1'>
                  <Field
                    id='postal_code'
                    name='postal_code'
                    type='number'
                    autoComplete='postal_code'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                <ErrorMessage name='postal_code' />
              </div>
              <div>
                <label
                  className='block text-sm font-medium text-gray-700'
                  htmlFor='email'
                >
                  Email address
                </label>
                <div className='mt-1'>
                  <Field
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                <ErrorMessage name='email' />
              </div>
              <div>
                <label
                  className='block text-sm font-medium text-gray-700'
                  htmlFor='password'
                >
                  Password
                </label>
                <div className='mt-1'>
                  <Field
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                <ErrorMessage name='password' />
              </div>
              <div>
                <label
                  className='block text-sm font-medium text-gray-700'
                  htmlFor='password2'
                >
                  Repeat password
                </label>
                <div className='mt-1'>
                  <Field
                    id='password2'
                    name='password2'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                <ErrorMessage name='password2' />
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Sign up
                </button>
              </div>
            </Form>
          </Formik>
          <Alert />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signup })(SignUp);

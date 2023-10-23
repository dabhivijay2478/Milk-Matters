import React, { useState } from 'react';
import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import axios from 'axios';


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await axios.post('http://localhost:5000/user-create', data);
    console.log(response);
    toast.success('Account created successfully');
    return redirect('/login');
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message || 'Please double-check your credentials';
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dairyCode: '',
    address: '', // Removed duplicate 'name' field
    contact: '',
    role: 'farmer',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className='h-screen grid place-items-center'>
      <form
        method='POST'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        <FormInput
          type='text'
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        <FormInput
          type='email'
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          type='password'
          label='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <FormInput
          type='text'
          label='Dairy Code'
          name='dairyCode'
          value={formData.dairyCode}
          onChange={handleChange}
        />
        <FormInput
          type='text'
          label='Address'
          name='address'
          value={formData.address}
          onChange={handleChange}
        />
        <FormInput
          type='text'
          label='Contact'
          name='contact'
          value={formData.contact}
          onChange={handleChange}
        />
        <div className='mt-4'>
          <SubmitBtn text='Register' />
        </div>
        <p className='text-center'>
          Already a member?
          <Link to='/login' className='ml-2 link link-hover link-primary capitalize'>
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;

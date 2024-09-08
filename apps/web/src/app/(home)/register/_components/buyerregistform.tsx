'use client';

import { Input } from '@/components/inputformik';
import { registerBuyer } from '@/libs/action/buyer';
import { registerSChema } from '@/libs/schema';
import { UserRegister } from '@/types/user';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function BuyerRegistForm() {
  interface UserRegisterConfPass extends UserRegister {
    confirmpassword: string;
  }

  const initialValues: UserRegisterConfPass = {
    email: '',
    username: '',
    password: '',
    confirmpassword: '',
    phone: '',
  };

  const onRegister = async (data: UserRegister) => {
    try {
      const res = await registerBuyer(data);
      toast.info(res.msg);
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950 w-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-3">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign Up
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSChema}
          onSubmit={(values, action) => {
            const { confirmpassword, ...formData } = values;
            onRegister(formData), action.resetForm();
          }}
        >
          {() => (
            <Form>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input name="email" type="email" />
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input name="username" type="string" />
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input name="password" type="password" />
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input name="confirmpassword" type="password" />
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input name="phone" type="string" placeholder="081233334444" />
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

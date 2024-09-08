'use client';

import { Input } from '@/components/inputformik';
import { loginBuyer } from '@/libs/action/buyer';
import { createCookie } from '@/libs/action/server';
import { loginSchema } from '@/libs/schema';
import { UserLogin } from '@/types/user';
import { Form, Formik, FormikHelpers, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function BuyerLoginForm() {
  const initialValues: UserLogin = {
    data: '',
    password: '',
  };

  const onLogin = async (data: UserLogin, action: FormikHelpers<UserLogin>) => {
    try {
      const { result, ok } = await loginBuyer(data);
      if (!ok) throw result.msg;
      createCookie('token', result.token);
      console.log(result.token);
      toast.info(result.msg);
      action.resetForm();
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950 w-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-3">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, action) => {
            onLogin(values, action);
          }}
        >
          {() => (
            <Form>
              {/* Username/Email Input */}

              <label className="block text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <Input name="data" type="string" />
              {/* Password Input */}
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input name="password" type="password" />
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Log In
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

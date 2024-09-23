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
    email: '',
    password: '',
  };

  const onLogin = async (data: UserLogin, action: FormikHelpers<UserLogin>) => {
    try {
      const { result, ok } = await loginBuyer(data);
      if (!ok) throw result.msg;
      createCookie('token', result.token);
      toast.success(result.msg);
      action.resetForm();
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-secondary w-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-3">
        <h2 className="text-2xl font-bold text-center text-main-black mb-6">
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
              <label className="block text-sm font-medium text-main-black">
                Email
              </label>
              <Input name="email" type="email" />
              <label className="block text-sm font-medium text-main-black">
                Password
              </label>
              <Input name="password" type="password" />
              <div>
                <button
                  type="submit"
                  className="w-full bg-main hover:bg-main-black text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Log In
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-sm text-center text-main-black">
          Don't have an account?{' '}
          <Link href="/register" className="text-main hover:underline font-bold">
            Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

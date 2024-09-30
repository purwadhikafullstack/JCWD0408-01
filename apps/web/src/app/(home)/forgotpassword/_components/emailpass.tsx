'use client';

import { Input } from '@/components/inputformik';
import { reqChangePass } from '@/libs/action/buyer';
import { registerSchema } from '@/libs/schema';
import { UserRegister } from '@/types/user';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function EmailPass() {

  const initialValues: UserRegister = {
    email: '',
  };

  const onForgot = async (data: UserRegister) => {
    try {
      const res = await reqChangePass(data);
      toast.success(res.msg);
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary w-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-3">
        <h2 className="text-2xl font-bold text-center text-main-black mb-6">
          Enter your email
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={(values, action) => {
            onForgot(values), action.resetForm();
          }}
        >
          {() => (
            <Form>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input name="email" type="email" />
              <div>
                <button
                  type="submit"
                  className="w-full bg-main text-secondary font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-sm text-center text-main-black">
          Wanna go back to{' '}
          <Link href="/" className="text-main hover:underline font-bold">
            Bask-it
          </Link>
          ?
        </p>
      </div>
    </div>
  );
}

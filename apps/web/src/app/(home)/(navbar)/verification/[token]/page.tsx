'use client';

import { Formik, Form } from 'formik';
import { motion } from 'framer-motion';
import { navigate } from '@/libs/action/server';
import { toast } from 'react-toastify';
import { verificationProcess } from '@/libs/action/user';
import { verificationSchema } from '@/libs/schema';
import { Input } from '@/components/inputformik';
import { UserFirstVerification } from '@/types/user';

export default function Verification({
  params,
}: {
  params: { token: string };
}) {
  interface UserRegisterConfPass extends UserFirstVerification {
    confirmpassword: string;
  }

  const initialValues: UserRegisterConfPass = {
    first_name: '',
    password: '',
    confirmpassword: '',
    phone: '',
  };
  const handleSubmit = async (data: UserFirstVerification) => {
    try {
      const { result, ok } = await verificationProcess(params.token, data);
      if (!ok) throw result.msg;
      toast.success(result.msg);
      navigate('/login');
    } catch (error) {
      toast.error('No cap');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8 bg-secondary">
      <motion.h1
        className="text-3xl font-bold text-main"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Please verify your account
      </motion.h1>

      <motion.div
        className="bg-white backdrop-blur-md p-8 rounded-lg shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={verificationSchema}
          onSubmit={(values, action) => {
            const { confirmpassword, ...formData } = values;
            handleSubmit(formData), action.resetForm();
          }}
        >
          {() => (
            <Form>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-main-black">
                  Full name
                </label>
                <Input name="first_name" type="string" placeholder="Jane Doe" />
                <label className="block text-sm font-medium text-main-black">
                  Password
                </label>
                <Input name="password" type="password" />
                <label className="block text-sm font-medium text-main-black">
                  Confirm Password
                </label>
                <Input name="confirmpassword" type="password" />
                <label className="block text-sm font-medium text-main-black">
                  Phone Number
                </label>
                <Input name="phone" type="string" placeholder="081233334444" />
                <button
                  type="submit"
                  className="w-full bg-main text-secondary font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Continue
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
}

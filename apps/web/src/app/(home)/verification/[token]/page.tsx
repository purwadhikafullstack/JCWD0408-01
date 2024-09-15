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
})

{
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
      const { result, ok } = await verificationProcess(
        params.token,
        data
      );
      if (!ok) throw result.msg;
      toast.success(result.msg);
      navigate('/login');
    } catch (error) {
      toast.error("No cap");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8 bg-gradient-to-br from-blue-200 to-indigo-300">
      <motion.h1
        className="text-3xl font-bold text-blue-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Please verify your account
      </motion.h1>

      <motion.div
        className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md"
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
              <label className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <Input name="first_name" type="string" placeholder='Jane Doe'/>
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
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded w-full transition-colors duration-300"
                >
                  Verify
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
}

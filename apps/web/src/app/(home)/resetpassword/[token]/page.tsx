'use client';

import { Formik, Form } from 'formik';
import { motion } from 'framer-motion';
import { navigate } from '@/libs/action/server';
import { toast } from 'react-toastify';
import { resetPasswordSchema} from '@/libs/schema';
import { Input } from '@/components/inputformik';
import { ResetPassword} from '@/types/user';
import { changePass } from '@/libs/action/buyer';
import Cookies from 'js-cookie';

export default function ResetForm({
  params,
}: {
  params: { token: string };
})

{
  interface ResetConfPass extends ResetPassword {
    confirmpassword: string;
  }

  const initialValues: ResetConfPass = {
    password: '',
    newPassword: '',
    confirmpassword: '',
  };
  const handleSubmit = async (data: ResetPassword) => {
    try {
      const res = await changePass(
        params.token,
        data
      );
      if (res.status == 'error') throw toast.error(res.msg)
      toast.success('Password has changed, please log back in');
      Cookies.remove('token')
      navigate('/login');
    } catch (error) {
      // toast.error('Reset Failed')
      console.log(error);
      
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
        Enter your current and new password
      </motion.h1>

      <motion.div
        className="bg-white backdrop-blur-md p-8 rounded-lg shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
          onSubmit={(values, action) => {
            const { confirmpassword, ...formData } = values;
            handleSubmit(formData), action.resetForm();
          }}
        >
          {() => (
            <Form>
              <div className="space-y-4">
              <label className="block text-sm font-medium text-main-black">
                Current Password
              </label>
              <Input name="password" type="password"/>
              <label className="block text-sm font-medium text-main-black">
                New Password
              </label>
              <Input name="newPassword" type="password" />
              <label className="block text-sm font-medium text-main-black">
                Confirm Password
              </label>
              <Input name="confirmpassword" type="password" />
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

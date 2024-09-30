'use client';

import { Input } from '@/components/inputformik';
import { changeEmail, reqChangePass } from '@/libs/action/buyer';
import { registerSchema } from '@/libs/schema';
import { UserRegister } from '@/types/user';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

export default function ChangeEmail() {
  const initialValues: UserRegister = {
    email: '',
  };

  const onEmailChange = async (data: UserRegister) => {
    try {
      const res = await changeEmail(data);
      toast.success(res.msg);
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <div className="">
      <div className="w-full flex gap-10 items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            onEmailChange(values);
          }}
        >
          {() => (
            <Form>
              <Input name="email" type="email" />
            </Form>
          )}
        </Formik>
        <div className='flex gap-3'>
          <button
            type="submit"
            className="w-24 bg-main text-secondary font-bold py-2 px-4 mb-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Save
          </button>
          <button
            type="submit"
            className="w-24 bg-secondary text-main font-bold py-2 px-4 mb-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

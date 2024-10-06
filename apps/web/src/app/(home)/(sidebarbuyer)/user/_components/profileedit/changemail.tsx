'use client';

import { Input } from '@/components/inputformik';
import { changeEmail } from '@/libs/action/buyer';
import { registerSchema } from '@/libs/schema';
import { UserRegister } from '@/types/user';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

interface ChangeMailProps {
  onCancel: () => void; 
  onSuccess: () => void; 
}

export default function ChangeMail({ onCancel, onSuccess }: ChangeMailProps) {
  const initialValues: UserRegister = {
    email: '',
  };

  const onEmailChange = async (data: UserRegister) => {
    try {
      const res = await changeEmail(data);
      toast.success(res.msg);
      onSuccess();
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="w-full flex-col gap-4 items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          onEmailChange(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Input name="email" type="email" />
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="w-24 bg-main text-secondary font-bold py-2 px-4 mb-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancel} 
                className="w-24 bg-secondary text-main font-bold py-2 px-4 mb-3 rounded-lg border-2 border-main transition duration-300 ease-in-out transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

'use client';

import { Input } from '@/components/inputformik';
import { changePhone } from '@/libs/action/buyer';
import { editPhoneSchema } from '@/libs/schema';
import { UserPhone } from '@/types/user';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

interface ChangePhoneProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function ChangePhone({ onCancel, onSuccess }: ChangePhoneProps) {
  const initialValues: UserPhone = {
    phone: '',
  };

  const onPhoneChange = async (data: UserPhone) => {
    try {
      const res = await changePhone(data);
      console.log(res);
      toast.success(res.msg);
      onSuccess();
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="">
      <div className="w-full flex-col gap-4 items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={editPhoneSchema}
          onSubmit={(values) => {
            onPhoneChange(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Input name="phone" type="string" placeholder='080012341234' />
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
    </div>
  );
}

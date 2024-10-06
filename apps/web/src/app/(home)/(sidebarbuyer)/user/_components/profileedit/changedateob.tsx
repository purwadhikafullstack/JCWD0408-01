'use client';

import { Input } from '@/components/inputformik';
import { changeDateOB, changePhone } from '@/libs/action/buyer';
import { editDateSchema, editPhoneSchema } from '@/libs/schema';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

interface ChangeDOBProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function ChangeDOB({ onCancel, onSuccess }: ChangeDOBProps) {
  const initialValues = {
    date_ob: '',
  };

  const onDateChange = async (data: Date) => {
    try {
      const res = await changeDateOB(data);
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
          validationSchema={editDateSchema}
          onSubmit={(values) => {
            const formattedDate = new Date(values.date_ob)
            onDateChange(formattedDate);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Input name="date_ob" type="date" />
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

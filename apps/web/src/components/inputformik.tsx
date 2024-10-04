import { ErrorMessage, Field } from 'formik';
import React from 'react';

interface InputProps {
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ name, type, placeholder }) => {
  return (
    <div className="mb-4">
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete = 'off'
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:outline-none mt-1"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export interface ICreateAccBySuperAdmin {
  email: string;
  password: string;
  first_name: string;
  phone: string;
}

export interface ICreateProductBySuperAdmin {
  name : string;
  price : string;
  description : string;
  category_id : string;
  qty : string;
}

export interface ICreateCategoryBySuperAdmin {
  category_name : string;
  description : string;
}

export interface CreateDiscount {
  product_id: number;
  discount_code: string;
  discount_type: string;
  discount_value: number;
  minimum_order: null | number;
  expires_at: string;
}

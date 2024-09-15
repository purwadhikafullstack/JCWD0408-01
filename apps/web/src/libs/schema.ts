import * as Yup from 'yup';

export const registerSchema = Yup.object({
  email: Yup.string().email('Invalid format').required('Email is required'),
});

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid format').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
    .matches(/[a-z]/, 'Password must include at least one lowercase letter')
    .matches(/\d/, 'Password must include at least one number')
    .matches(
      /[!@#$%^&*]/,
      'Password must include at least one special character from !@#$%^&*',
    ),
});

export const verificationSchema = Yup.object({
  first_name: Yup.string()
    .min(6, 'Username must be at least 6 characters long')
    .matches(
      /^[a-zA-Z ]+$/,
      'Username must contain only letters, numbers, and underscores',
    )
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
    .matches(/[a-z]/, 'Password must include at least one lowercase letter')
    .matches(/\d/, 'Password must include at least one number')
    .matches(
      /[!@#$%^&*]/,
      'Password must include at least one special character from !@#$%^&*',
    )
    .required('Password is required'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords don't match")
    .required('Confirm password is required'),
  phone: Yup.string()
    .matches(
      /^08\d{9,12}$/,
      'Phone number must start with 08 with 10 to 13 digits long',
    )
    .required('Phone number is required'),
});

import * as Yup from 'yup'

export const registerSChema = Yup.object({
    email: Yup.string().email('invalid format').required('email is required'),
    username: Yup.string().required('username is required'),
    password: Yup.string().required('password is required'),
    confirmpassword: Yup.string().oneOf([Yup.ref('password')], "Password doesn't match").required('required'),
    phone: Yup.string().required('phone number is required')
})

export const loginSchema = Yup.object({
    data: Yup.string().required('wrong username or email'),
    password: Yup.string().required('password is required')
})

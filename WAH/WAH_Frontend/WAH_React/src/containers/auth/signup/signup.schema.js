import * as yup from 'yup';

export default yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email().required('Email is required'),
  phoneNumber: yup
  .string()
  .matches(
    /^[0-9]{10}$/,
    'Phone number must be exactly 10 digits'
  )
  .required('Phone number is required'),
  gender: yup.string().required('Gender is required'),
  dob: yup.date().required('Date of Birth is required'),
  password: yup.string().min(6).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  profileImage: yup.mixed().required('Profile image is required'),
});

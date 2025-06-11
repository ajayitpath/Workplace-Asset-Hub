import * as yup from 'yup';

export default yup.object().shape({
  newPassword: yup.string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
});

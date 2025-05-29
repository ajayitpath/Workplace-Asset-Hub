// validations/resetPasswordSchema.js
import * as yup from 'yup';

const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default resetPasswordSchema;

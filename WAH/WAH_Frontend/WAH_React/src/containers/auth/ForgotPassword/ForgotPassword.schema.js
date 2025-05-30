// validations/forgotPasswordSchema.js
import * as yup from 'yup';

export const forgotPasswordSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
});

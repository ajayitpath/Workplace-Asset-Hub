// validations/otpSchema.js
import * as yup from 'yup';

export const otpSchema = yup.object({
  otp: yup
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .matches(/^\d+$/, 'OTP must contain only numbers')
    .required('OTP is required'),
});

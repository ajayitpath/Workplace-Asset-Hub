import * as yup from 'yup';

export default yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email().required('Email is required'),
  phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required(),
  gender: yup.string().required('Gender is required'),
  role: yup.string().required('Role is required'),
  dob: yup.date().required('Date of Birth is required'),
  password: yup.string().min(6).required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
  profileImage: yup.mixed()
    .test("required", "Profile image is required", (value) => {
      return value && value.length > 0;
    })
    .test("fileSize", "File size is too large", (value) => {
      if (!value || !value[0]) return true; // Skip if no file
      return value[0].size <= 5000000; // 5MB limit
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value || !value[0]) return true; // Skip if no file
      return ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type);
    }),
  deskNo: yup.string().nullable(),
});

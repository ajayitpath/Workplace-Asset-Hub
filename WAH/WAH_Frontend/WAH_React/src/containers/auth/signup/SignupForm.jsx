// File: components/forms/SignupForm.jsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signupSchema from './signup.schema';
import { registerUser } from '../../../services/Auth/AuthService';
import { useState } from 'react';
import FormInput from '../../../components/FormInput';

const genders = ['Male', 'Female', 'Other'];

const SignupForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'profileImage') {
        formData.append('profileImageUrl', value[0]); // backend expects `profileImageUrl`
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await registerUser(formData);
      console.log('Registered:', response);
      alert('User registered successfully!');
      reset();
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      alert('Registration failed.');
    }
  };

  const selectedImage = watch('profileImage');

  React.useEffect(() => {
    if (selectedImage?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(selectedImage[0]);
    } else {
      setImagePreview(null);
    }
  }, [selectedImage]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* <TextInput label="First Name" name="firstName" register={register} error={errors.firstName?.message} />
        <TextInput label="Last Name" name="lastName" register={register} error={errors.lastName?.message} />
        <TextInput label="Email" name="email" type="email" register={register} error={errors.email?.message} />
        <TextInput label="Phone Number" name="phoneNumber" register={register} error={errors.phoneNumber?.message} />
        <TextInput label="Password" name="password" type="password" register={register} error={errors.password?.message} />
        <TextInput label="Confirm Password" name="confirmPassword" type="password" register={register} error={errors.confirmPassword?.message} /> */}


<FormInput label="First Name" name="firstName" register={register} error={errors.firstName?.message} />
<FormInput label="Last Name" name="lastName" register={register} error={errors.lastName?.message} />
<FormInput label="Email" name="email" type="email" register={register} error={errors.email?.message} />
<FormInput label="Phone Number" name="phoneNumber" register={register} error={errors.phoneNumber?.message} />
<FormInput label="Password" name="password" type="password" register={register} error={errors.password?.message} />
<FormInput label="Confirm Password" name="confirmPassword" type="password" register={register} error={errors.confirmPassword?.message} />
<FormInput label="Desk Number (optional)" name="deskNo" register={register} error={errors.deskNo?.message} />
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select {...register('gender')} className="form-select w-full">
            <option value="">Select Gender</option>
            {genders.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <p className="text-red-500 text-xs">{errors.gender?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input type="date" {...register('dob')} className="form-input w-full" />
          <p className="text-red-500 text-xs">{errors.dob?.message}</p>
        </div>

        <FormInput label="Desk Number (optional)" name="deskNo" register={register} error={errors.deskNo?.message} />

        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            {...register('profileImage')}
            className="form-input"
          />
          {imagePreview && <img src={imagePreview} alt="preview" className="w-12 h-12 rounded-full object-cover" />}
        </div>
        <p className="text-red-500 text-xs">{errors.profileImage?.message}</p>
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-md shadow hover:opacity-90 transition"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default SignupForm;

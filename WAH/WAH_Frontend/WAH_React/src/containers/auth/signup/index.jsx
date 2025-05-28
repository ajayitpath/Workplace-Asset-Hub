import React from "react";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import signupSchema from "./signup.schema";

import { registerUser } from "../../../services/Auth/AuthService";

import { useState } from "react";

import FormInput from "../../../components/FormInput";

import {

  TextField,

  MenuItem,

  FormControl,

  InputLabel,

  Select,

  Button,

  Avatar,

} from "@mui/material";



const genders = ["Male", "Female", "Other"];



const SignupForm = () => {

  const [imagePreview, setImagePreview] = useState(null);

  const {

    register,

    handleSubmit,

    control,

    formState: { errors },

    watch,

    reset,

  } = useForm({

    resolver: yupResolver(signupSchema),

  });



  const onSubmit = async (data) => {

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {

      if (key === "profileImage") {

        formData.append("profileImageUrl", value[0]); // backend expects `profileImageUrl`

      } else {

        formData.append(key, value);

      }

    });



    try {

      const response = await registerUser(formData);

      console.log("Registered:", response);

      alert("User registered successfully!");

      reset();

      setImagePreview(null);

    } catch (err) {

      console.error(err);

      alert("Registration failed.");

    }

  };



  const selectedImage = watch("profileImage");



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

    <form

      onSubmit={handleSubmit(onSubmit)}

      className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"

    >

      <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">

        <FormInput

          label="First Name"

          name="firstName"

          register={register}

          error={errors.firstName?.message}

        />

        <FormInput

          label="Last Name"

          name="lastName"

          register={register}

          error={errors.lastName?.message}

        />

        <FormInput

          label="Email"

          name="email"

          type="email"

          register={register}

          error={errors.email?.message}

        />

        <FormInput

          label="Phone Number"

          name="phoneNumber"

          register={register}

          error={errors.phoneNumber?.message}

        />

        <FormInput

          label="Password"

          name="password"

          type="password"

          register={register}

          error={errors.password?.message}

        />

        <FormInput

          label="Confirm Password"

          name="confirmPassword"

          type="password"

          register={register}

          error={errors.confirmPassword?.message}

        />

        {/* <FormInput

          label="Desk Number (optional)"

          name="deskNo"

          register={register}

          error={errors.deskNo?.message}

        /> */}

        <div>

          {/* <label className="block text-sm font-medium">Gender</label>

          <select {...register("gender")} className="form-select w-full">

            <option value="">Select Gender</option>

            {genders.map((g) => (

              <option key={g} value={g}>

                {g}

              </option>

            ))}

          </select> */}

          <FormControl fullWidth>

            <InputLabel id="gender-label">Gender</InputLabel>

            <Select

              labelId="gender-label"

              id="gender"

              label="Gender"

              defaultValue=""

              {...register("gender")}

              error={!!errors.gender}

            >

              {genders.map((g) => (

                <MenuItem key={g} value={g}>

                  {g}

                </MenuItem>

              ))}

            </Select>

            <p className="text-red-500 text-xs">{errors.gender?.message}</p>

          </FormControl>

        </div>



        <div>

          {/* <label className="block text-sm font-medium">Date of Birth</label>

          <input

            type="date"

            {...register("dob")}

            className="form-input w-full"

          />

          <p className="text-red-500 text-xs">{errors.dob?.message}</p> */}

          <TextField

            fullWidth

            label="Date of Birth"

            type="date"

            InputLabelProps={{ shrink: true }}

            {...register("dob")}

            error={!!errors.dob}

            helperText={errors.dob?.message}

          />

        </div>

      </div>



      <div className="flex items-center justify-center gap-4 w-full max-w-md mx-auto px-4">

        {/* File input with filename */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full">

          <Button variant="outlined" component="label">

            Upload Image

            <input

              type="file"

              hidden

              accept="image/*"

              className="w-full sm:w-64 cursor-pointer"

              onChange={(e) => {

                const file = e.target.files?.[0];

                if (file) {

                  setImagePreview(URL.createObjectURL(file));

                  setValue("profileImage", file); // Optional if using react-hook-form

                }

              }}

            />

          </Button>

          {watch("profileImage")?.name && (

            <span className="truncate max-w-[200px] text-sm text-gray-600 text-center">

              {watch("profileImage")?.name}

            </span>

          )}

        </div>



        {/* Large Avatar preview */}

        {imagePreview && (

          <Avatar

            src={imagePreview}

            alt="Profile Preview"

            sx={{ width: 120, height: 120 }}

            className="shadow-md"

          />

        )}



        {/* Error message */}

        <p className="text-red-500 text-xs text-center">

          {errors.profileImage?.message}

        </p>

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


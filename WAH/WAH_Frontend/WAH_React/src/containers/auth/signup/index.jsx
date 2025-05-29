// File: components/forms/SignupForm.jsx

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signupSchema from "../../../schema/signup.schema";
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
  InputAdornment,
  IconButton
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import defaultAvatar from '../../../assets/Avtar.png';

const genders = ["Male", "Female", "Other"];
const roles = ["Admin", "Manager", "Employee"];
// Add these imports
import { Box, Paper, Typography } from '@mui/material';

// Add this import at the top with other imports


const Signup = () => {
  const [imagePreview, setImagePreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      dob: "",
      password: "",
      confirmPassword: "",
      deskNo: "",
      profileImage: null
    }
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
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          borderRadius: 4, 
          width: '100%', 
          maxWidth: 500,
          backgroundColor: (theme) => theme.palette.background.paper
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 'bold', color: 'rgb(0, 0, 0)' }}>
          Create Your Account
        </Typography>
        
        
        
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative inline-block">
              <Avatar
                src={imagePreview || defaultAvatar}
                alt="Profile Preview"
                sx={{ width: 120, height: 120, marginTop: 2, boxShadow: 2 }}
              />
              <div 
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer"
                onClick={() => document.querySelector('input[type="file"]').click()}
              >
                <EditIcon sx={{ fontSize: 16, color: '#5974FC' }} />
              </div>
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            {...register("profileImage")}
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setValue("profileImage", [file]);
              }
            }}
          />
          {/* Personal Information Section */}
          <div className="grid grid-cols-2 gap-6 mb-8">
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

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((show) => !show)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            

            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("dob")}
              error={!!errors.dob}
              helperText={errors.dob?.message}
            />

            <FormInput
              label="Desk Number (optional)"
              name="deskNo"
              register={register}
              error={errors.deskNo?.message}
            />

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
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender?.message}</p>
              )}
            </FormControl>

          <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                label="Role"
                defaultValue=""
                {...register("role")}
                error={!!errors.role}
              >
                {roles.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role?.message}</p>
              )}
            </FormControl>
          </div>
          

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              backgroundColor: (theme) => theme.palette.primary.main,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.dark,
              }
            }}
          >
            Register
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;

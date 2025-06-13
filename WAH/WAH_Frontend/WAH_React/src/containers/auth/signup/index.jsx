// File: components/forms/SignupForm.jsx

import React from "react";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import signupSchema from "../../../schema/signup.schema";
import URLS from "../../../constants/urls";
import FormInput from "../../../components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../../redux/thunks/authThunk";
import { ROLES } from "../../../constants/roles";
import { genderOptions } from "../../../constants/enums";
import PasswordInput from "../../../components/PasswordInput";

const DEFAULT_ROLE_ID = 3;

const SignupForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
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
    },
  });

  const onSubmit = async (data) => {
    try {
      // Format date to match DateOnly in C#
      const formattedData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        confirmPassword: data.confirmPassword,
        gender: parseInt(data.gender), // Convert to number enum
        dob: new Date(data.dob).toISOString().split("T")[0], // Format: YYYY-MM-DD
        deskNo: data.deskNo || null,
        roleId: 3, // Default role ID for User
      };

      const resultAction = await dispatch(registerThunk(formattedData));
      if (registerThunk.fulfilled.match(resultAction)) {
        toast.success("Registration successful! Please verify your email.");
        navigate("/verify-email", { state: { email: data.email } });
      }
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Create Your Account
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Form Fields */}
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

            <PasswordInput
              label="Password"
              name="password"
              register={register}
              error={errors.password}
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.password}
            />

            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("dob")}
              error={!!errors.dob}
              helperText={errors.dob?.message}
              inputProps={{
                max: new Date().toISOString().split("T")[0], // Prevent future dates
              }}
            />

            <FormInput
              label="Desk Number (optional)"
              name="deskNo"
              register={register}
              error={errors.deskNo?.message}
            />

            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.gender}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select labelId="gender-label" label="Gender" {...field}>
                    {genderOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.gender && (
                    <FormHelperText error>
                      {errors.gender.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              textTransform: "none",
              backgroundColor: (theme) => theme.palette.primary.main,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          {/* Login Link */}
          <Typography align="center" variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default SignupForm;

import React from 'react';
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  Select,
  Avatar,
  Stack
} from '@mui/material';
import { DesktopDatePicker } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signupSchema from './signup.schema';
import { styled } from '@mui/system';

const ColorButton = styled(Button)({
  background: 'linear-gradient(90deg, #58C791, #715DF2)', // Gradient 1 from Figma
  color: '#fff',
  fontWeight: 'bold',
  '&:hover': {
    opacity: 0.9,
  },
});

const genders = ['Male', 'Female', 'Other'];

const SignupForm = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    console.log('Signup Data:', data);
    // TODO: integrate with backend API
  };

  const selectedImage = watch('profileImage');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            fullWidth
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            fullWidth
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            fullWidth
            {...register('phoneNumber')}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} error={!!errors.gender}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.gender && (
              <Typography variant="caption" color="error">
                {errors.gender.message}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="dob"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DesktopDatePicker
                label="Date of Birth"
                inputFormat="MM/DD/YYYY"
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                  />
                )}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Avatar
              src={selectedImage?.[0] ? URL.createObjectURL(selectedImage[0]) : ''}
              sx={{ width: 56, height: 56 }}
            />
            <Button variant="contained" component="label">
              Upload Profile Image
              <input
                hidden
                type="file"
                accept="image/*"
                {...register('profileImage')}
              />
            </Button>
          </Stack>
          {errors.profileImage && (
            <Typography variant="caption" color="error">
              {errors.profileImage.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <ColorButton type="submit" sx={{ minWidth: 200 }}>
              Sign Up
            </ColorButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;

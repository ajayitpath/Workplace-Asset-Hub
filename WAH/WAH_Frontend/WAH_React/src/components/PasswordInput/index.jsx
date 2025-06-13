import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import usePasswordVisibility from '../../hooks/usePasswordVisibility';

const PasswordInput = ({ label, register, name, error, ...props }) => {
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  return (
    <TextField
      {...register(name)}
      label={label}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      error={!!error}
      helperText={error?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={togglePasswordVisibility}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default PasswordInput;